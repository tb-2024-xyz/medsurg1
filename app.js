(function () {
  "use strict";

  var BANK = window.QUESTIONS || [];
  var TOPICS = window.TOPICS || [];
  var CHAPTERS = window.CHAPTERS || {};
  var STORE_KEY = "nur285-exam1-progress-v1";
  var SECONDS_PER_QUESTION = 90;
  var STRIP_MAX = 40;

  var app = document.getElementById("app");
  var byId = {};
  BANK.forEach(function (q) { byId[q.id] = q; });
  var topicById = {};
  TOPICS.forEach(function (t) { topicById[t.id] = t; });

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function shuffle(a) {
    var r = a.slice();
    for (var i = r.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = r[i]; r[i] = r[j]; r[j] = t;
    }
    return r;
  }
  function range(n) { var r = []; for (var i = 0; i < n; i++) r.push(i); return r; }
  function norm(s) {
    return String(s).toLowerCase().replace(/[\u2013\u2014]/g, "-").replace(/\s*-\s*/g, "-").replace(/\s+/g, " ").replace(/\.$/, "").trim();
  }
  function fmtTime(sec) {
    sec = Math.max(0, sec);
    var m = Math.floor(sec / 60), s = sec % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
  }

  /* ---------- progress storage ---------- */
  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY) || "{}"); } catch (e) { return {}; }
  }
  var progress = loadProgress();
  function saveProgress() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(progress)); } catch (e) { /* storage unavailable */ }
  }
  function rec(id) {
    if (!progress[id]) progress[id] = { seen: 0, right: 0, last: null, flag: false };
    return progress[id];
  }

  /* ---------- question logic ---------- */
  function evaluate(item) {
    var q = item.q, r = item.resp;
    if (q.type === "mc") return r === q.a;
    if (q.type === "sata") {
      if (!r || r.length !== q.a.length) return false;
      return q.a.every(function (i) { return r.indexOf(i) !== -1; });
    }
    if (q.type === "fill") {
      var v = norm(r || "");
      return v !== "" && q.a.some(function (x) { return norm(x) === v; });
    }
    if (q.type === "order") return r.every(function (v, i) { return v === i; });
    return false;
  }
  function isAnswered(item) {
    var q = item.q, r = item.resp;
    if (q.type === "mc") return r !== null;
    if (q.type === "sata") return r.length > 0;
    if (q.type === "fill") return String(r).trim() !== "";
    return !!item.touched;
  }
  function makeItem(q) {
    var item = { q: q, checked: false, correct: null, flagged: !!(progress[q.id] && progress[q.id].flag), recorded: false };
    if (q.type === "mc") { item.resp = null; item.shown = shuffle(range(q.opts.length)); }
    else if (q.type === "sata") { item.resp = []; item.shown = shuffle(range(q.opts.length)); }
    else if (q.type === "fill") { item.resp = ""; }
    else {
      var p = shuffle(range(q.opts.length));
      var same = p.every(function (v, i) { return v === i; });
      if (same) p.push(p.shift());
      item.resp = p;
    }
    return item;
  }
  function correctText(q) {
    if (q.type === "mc") return q.opts[q.a];
    if (q.type === "sata") return q.a.map(function (i) { return q.opts[i]; }).join("; ");
    if (q.type === "fill") return q.a[0];
    return q.opts.map(function (t, i) { return (i + 1) + ". " + t; }).join(" ");
  }
  function respText(item) {
    var q = item.q, r = item.resp;
    if (q.type === "mc") return r === null ? "No answer" : q.opts[r];
    if (q.type === "sata") return r.length ? r.slice().sort(function (a, b) { return a - b; }).map(function (i) { return q.opts[i]; }).join("; ") : "No answer";
    if (q.type === "fill") return String(r).trim() === "" ? "No answer" : r;
    return r.map(function (i, n) { return (n + 1) + ". " + q.opts[i]; }).join(" ");
  }
  function record(item) {
    if (item.recorded) return;
    item.recorded = true;
    var p = rec(item.q.id);
    p.seen += 1;
    if (item.correct) p.right += 1;
    p.last = !!item.correct;
  }

  /* ---------- stats ---------- */
  function topicStats() {
    var out = {};
    TOPICS.forEach(function (t) { out[t.id] = { total: 0, seen: 0, seenAttempts: 0, right: 0 }; });
    BANK.forEach(function (q) {
      var s = out[q.topic]; if (!s) return;
      s.total += 1;
      var p = progress[q.id];
      if (p && p.seen) { s.seen += 1; s.seenAttempts += p.seen; s.right += p.right; }
    });
    return out;
  }
  function counts() {
    var missed = 0, flagged = 0;
    BANK.forEach(function (q) {
      var p = progress[q.id];
      if (p && p.last === false) missed++;
      if (p && p.flag) flagged++;
    });
    return { missed: missed, flagged: flagged };
  }

  /* ---------- session state ---------- */
  var S = null;
  var timerId = null;
  function stopTimer() { if (timerId) { clearInterval(timerId); timerId = null; } }

  /* ---------- HOME ---------- */
  function renderHome() {
    stopTimer();
    S = null;
    var stats = topicStats();
    var c = counts();
    var h = "";
    h += "<h2>Practice for Exam 1</h2>";
    h += '<p class="lede">' + BANK.length + " questions built from your 2-day study guide. Pick a mode, choose topics, and start. Your progress is saved in this browser.</p>";

    h += '<form id="setup" class="panel" aria-label="Session setup">';
    h += "<fieldset><legend>Mode</legend><div class=\"modes\">";
    h += modeCard("study", "Study", "Answer one at a time and see the rationale right away.", true);
    h += modeCard("exam", "Exam", "Timed, no feedback until you submit. Scored out of 100.", false);
    h += modeCard("marathon", "Marathon", "Every question in your scope, with feedback. Stop whenever you like.", false);
    h += "</div></fieldset>";

    h += '<h3>Topics</h3>';
    Object.keys(CHAPTERS).forEach(function (ch) {
      h += '<div class="chapter"><label class="chapter-head"><input type="checkbox" data-chapter="' + ch + '" checked> ' + esc(CHAPTERS[ch]) + "</label><div class=\"topics\">";
      TOPICS.filter(function (t) { return t.chapter === ch; }).forEach(function (t) {
        var n = stats[t.id].total;
        h += '<label class="chip"><input type="checkbox" name="topic" value="' + t.id + '" checked> ' + esc(t.label) + " <em>" + n + "</em></label>";
      });
      h += "</div></div>";
    });

    h += '<div class="row">';
    h += '<label>Questions <select name="count"><option value="10">10</option><option value="20" selected>20</option><option value="30">30</option><option value="50">50</option><option value="all">All</option></select></label>';
    h += '<label>Include <select name="filter"><option value="all">All questions</option><option value="unseen">Not yet answered</option><option value="missed">Missed last time (' + c.missed + ')</option><option value="flagged">Flagged (' + c.flagged + ')</option></select></label>';
    h += "</div>";
    h += '<div class="actions"><button class="btn" type="submit">Start</button><span id="setupMsg" role="status" class="empty"></span></div>';
    h += "</form>";

    h += '<section class="panel" aria-labelledby="progTitle"><h3 id="progTitle">Your progress by topic</h3><div class="bars">';
    TOPICS.forEach(function (t) {
      var s = stats[t.id];
      var acc = s.seenAttempts ? Math.round((s.right / s.seenAttempts) * 100) : null;
      var cls = acc === null ? "" : acc >= 80 ? "hi" : acc >= 60 ? "mid" : "low";
      var cover = s.total ? Math.round((s.seen / s.total) * 100) : 0;
      h += '<div class="bar-row"><span>' + esc(t.label) + '</span><div class="bar" role="img" aria-label="' + cover + ' percent of questions attempted"><i class="' + cls + '" style="width:' + cover + '%"></i></div><span class="num">' +
        s.seen + "/" + s.total + (acc === null ? "" : " &middot; " + acc + "% correct") + "</span></div>";
    });
    h += '</div><p class="hint">Bar length shows how many questions you have tried. Color shows accuracy: green 80% or higher, amber 60-79%, red below 60%.</p>';
    h += '<div class="actions"><button class="linkbtn" id="resetBtn" type="button">Reset saved progress</button></div></section>';

    app.innerHTML = h;
    document.getElementById("setup").addEventListener("submit", onStart);
    document.getElementById("setup").addEventListener("change", onSetupChange);
    document.getElementById("resetBtn").addEventListener("click", function () {
      if (window.confirm("Clear all saved answers, accuracy, and flags?")) {
        progress = {}; saveProgress(); renderHome();
      }
    });
  }
  function modeCard(id, title, desc, checked) {
    return '<label class="mode"><input type="radio" name="mode" value="' + id + '"' + (checked ? " checked" : "") + "><strong>" + title + "</strong><span>" + desc + "</span></label>";
  }
  function onSetupChange(e) {
    var t = e.target;
    if (t.dataset && t.dataset.chapter) {
      var ch = t.dataset.chapter;
      TOPICS.filter(function (x) { return x.chapter === ch; }).forEach(function (x) {
        var box = document.querySelector('input[name="topic"][value="' + x.id + '"]');
        if (box) box.checked = t.checked;
      });
    }
    if (t.name === "topic") {
      Object.keys(CHAPTERS).forEach(function (ch) {
        var ids = TOPICS.filter(function (x) { return x.chapter === ch; }).map(function (x) { return x.id; });
        var all = ids.every(function (id) { return document.querySelector('input[name="topic"][value="' + id + '"]').checked; });
        document.querySelector('input[data-chapter="' + ch + '"]').checked = all;
      });
    }
  }
  function onStart(e) {
    e.preventDefault();
    var f = e.target;
    var topics = Array.prototype.slice.call(f.querySelectorAll('input[name="topic"]:checked')).map(function (x) { return x.value; });
    var mode = f.querySelector('input[name="mode"]:checked').value;
    var count = f.elements.count.value;
    var filter = f.elements.filter.value;
    var msg = document.getElementById("setupMsg");
    if (!topics.length) { msg.textContent = "Choose at least one topic."; return; }
    var pool = BANK.filter(function (q) {
      if (topics.indexOf(q.topic) === -1) return false;
      var p = progress[q.id];
      if (filter === "unseen") return !p || !p.seen;
      if (filter === "missed") return p && p.last === false;
      if (filter === "flagged") return p && p.flag;
      return true;
    });
    if (!pool.length) { msg.textContent = "No questions match those choices. Try a different filter or topic."; return; }
    startSession(mode, pool, count);
  }

  /* ---------- SESSION ---------- */
  function startSession(mode, pool, count) {
    var qs = shuffle(pool);
    if (mode !== "marathon" && count !== "all") qs = qs.slice(0, parseInt(count, 10));
    S = {
      mode: mode,
      items: qs.map(makeItem),
      i: 0,
      started: Date.now(),
      limit: mode === "exam" ? qs.length * SECONDS_PER_QUESTION : 0,
      finished: false
    };
    renderQuiz();
    if (S.limit) {
      stopTimer();
      timerId = setInterval(tick, 1000);
    }
    window.scrollTo(0, 0);
  }
  function remaining() { return S.limit - Math.floor((Date.now() - S.started) / 1000); }
  function tick() {
    if (!S || S.finished) { stopTimer(); return; }
    var left = remaining();
    var el = document.getElementById("timer");
    if (el) { el.textContent = fmtTime(left); el.classList.toggle("low", left <= 60); }
    if (left <= 0) { finish(true); }
  }

  function stripHtml() {
    var n = S.items.length;
    if (n > STRIP_MAX) {
      var done = S.items.filter(function (it) { return S.mode === "exam" ? isAnswered(it) : it.checked; }).length;
      return '<div class="plainbar" role="progressbar" aria-valuemin="0" aria-valuemax="' + n + '" aria-valuenow="' + done + '" aria-label="Questions answered"><i style="width:' + Math.round((done / n) * 100) + '%"></i></div>';
    }
    var h = '<div class="strip" role="group" aria-label="Question progress">';
    S.items.forEach(function (it, idx) {
      var cls = "beat";
      if (S.mode !== "exam" && it.checked) cls += it.correct ? " right" : " wrong";
      else if (S.mode === "exam" && isAnswered(it)) cls += " seen";
      if (it.flagged) cls += " flagged";
      if (idx === S.i) cls += " current";
      var label = "Question " + (idx + 1) + (it.flagged ? ", flagged" : "") + (idx === S.i ? ", current" : "");
      h += '<button type="button" class="' + cls + '" data-go="' + idx + '" aria-label="' + label + '"><svg viewBox="0 0 28 30" aria-hidden="true"><path d="M0 20 H8 L10 17 L12 20 H14 L16 4 L19 26 L21 20 H24 L26 18 L28 20"/></svg></button>';
    });
    return h + "</div>";
  }
  function bindStrip() {
    document.querySelectorAll("[data-go]").forEach(function (b) {
      b.addEventListener("click", function () { S.i = parseInt(b.dataset.go, 10); renderQuiz(); window.scrollTo(0, 0); });
    });
  }
  function refreshStrip() {
    var el = document.getElementById("stripHost");
    if (el) { el.innerHTML = stripHtml(); bindStrip(); }
  }

  function renderQuiz(focusSel) {
    var it = S.items[S.i], q = it.q;
    var showFB = it.checked && S.mode !== "exam";
    var h = '<div id="stripHost">' + stripHtml() + "</div>";
    h += '<section class="panel' + (showFB ? " locked" : "") + '" aria-live="off">';
    h += '<div class="meta"><span>Question ' + (S.i + 1) + " of " + S.items.length + '</span><span class="tag">' + esc(topicById[q.topic].label) + "</span>";
    if (S.limit) h += '<span class="timer" id="timer" role="timer">' + fmtTime(remaining()) + "</span>";
    h += "</div>";
    h += '<p class="stem" id="stem">' + esc(q.q) + "</p>";
    if (q.type === "sata") h += '<p class="hint">Select all that apply.</p>';
    if (q.type === "order") h += '<p class="hint">Use the arrows to put the steps in the correct order, first at the top.</p>';

    if (q.type === "mc" || q.type === "sata") h += optionsHtml(it, showFB);
    else if (q.type === "fill") {
      var cls = showFB ? (it.correct ? " right" : " wrong") : "";
      h += '<input class="fill' + cls + '" id="fillBox" type="text" autocomplete="off" aria-labelledby="stem" value="' + esc(it.resp) + '"' + (showFB ? " disabled" : "") + ">";
    } else h += orderHtml(it, showFB);

    if (showFB) {
      h += '<div class="feedback ' + (it.correct ? "right" : "wrong") + '" role="status"><strong>' + (it.correct ? "Correct" : "Not quite") + "</strong>";
      if (!it.correct) h += "<p>Correct answer: " + esc(correctText(q)) + "</p>";
      h += "<p>" + esc(q.why) + '</p><p class="ref">Review: ' + esc(topicById[q.topic].ref) + " in the study guide</p></div>";
    }

    h += '<div class="actions">';
    h += '<button class="btn ghost" type="button" id="prevBtn"' + (S.i === 0 ? " disabled" : "") + ">Previous</button>";
    if (S.mode !== "exam" && !it.checked) h += '<button class="btn" type="button" id="checkBtn"' + (isAnswered(it) ? "" : " disabled") + ">Check answer</button>";
    else if (S.i < S.items.length - 1) h += '<button class="btn" type="button" id="nextBtn">Next question</button>';
    else if (S.mode === "exam") h += '<button class="btn" type="button" id="finishBtn">Submit exam</button>';
    else h += '<button class="btn" type="button" id="finishBtn">See results</button>';
    h += '<button class="btn ghost" type="button" id="flagBtn" aria-pressed="' + it.flagged + '">' + (it.flagged ? "Unflag" : "Flag for review") + "</button>";
    h += '<span class="spacer"></span>';
    if (S.mode === "exam" && S.i < S.items.length - 1) h += '<button class="btn ghost" type="button" id="finishBtn">Submit exam</button>';
    else if (S.mode !== "exam") h += '<button class="btn ghost" type="button" id="finishBtn2">End session</button>';
    h += "</div></section>";

    app.innerHTML = h;
    bindQuiz();
    if (focusSel) { var f = document.querySelector(focusSel); if (f) f.focus(); }
  }

  function optionsHtml(it, showFB) {
    var q = it.q;
    var h = '<ul class="opts" role="group" aria-labelledby="stem">';
    it.shown.forEach(function (oi) {
      var chosen = q.type === "mc" ? it.resp === oi : it.resp.indexOf(oi) !== -1;
      var isRight = q.type === "mc" ? q.a === oi : q.a.indexOf(oi) !== -1;
      var cls = "opt", mark = "";
      if (showFB) {
        if (chosen && isRight) { cls += " right"; mark = "Correct"; }
        else if (chosen && !isRight) { cls += " wrong"; mark = "Incorrect"; }
        else if (!chosen && isRight) { cls += " missed"; mark = "Correct answer"; }
      }
      var type = q.type === "mc" ? "radio" : "checkbox";
      h += '<li><label class="' + cls + '"><input type="' + type + '" name="opt" value="' + oi + '"' + (chosen ? " checked" : "") + (showFB ? " disabled" : "") + "><span>" + esc(q.opts[oi]) + "</span>" + (mark ? '<span class="mark">' + mark + "</span>" : "") + "</label></li>";
    });
    return h + "</ul>";
  }
  function orderHtml(it, showFB) {
    var q = it.q;
    var h = '<ol class="seq">';
    it.resp.forEach(function (oi, pos) {
      var cls = "";
      if (showFB) cls = oi === pos ? "right" : "wrong";
      h += '<li class="' + cls + '"><span class="pos">' + (pos + 1) + '</span><span class="txt">' + esc(q.opts[oi]) + "</span>";
      if (!showFB) {
        h += '<button type="button" data-move="up" data-pos="' + pos + '" aria-label="Move up"' + (pos === 0 ? " disabled" : "") + ">&uarr;</button>";
        h += '<button type="button" data-move="down" data-pos="' + pos + '" aria-label="Move down"' + (pos === it.resp.length - 1 ? " disabled" : "") + ">&darr;</button>";
      }
      h += "</li>";
    });
    return h + "</ol>";
  }

  function bindQuiz() {
    var it = S.items[S.i], q = it.q;
    var on = function (id, fn) { var el = document.getElementById(id); if (el) el.addEventListener("click", fn); };

    bindStrip();
    document.querySelectorAll('input[name="opt"]').forEach(function (inp) {
      inp.addEventListener("change", function () {
        var v = parseInt(inp.value, 10);
        if (q.type === "mc") it.resp = v;
        else {
          var idx = it.resp.indexOf(v);
          if (inp.checked && idx === -1) it.resp.push(v);
          if (!inp.checked && idx !== -1) it.resp.splice(idx, 1);
        }
        afterAnswerChange();
      });
    });
    var fb = document.getElementById("fillBox");
    if (fb) {
      fb.addEventListener("input", function () { it.resp = fb.value; afterAnswerChange(); });
      fb.addEventListener("keydown", function (e) { if (e.key === "Enter" && S.mode !== "exam") { e.preventDefault(); doCheck(); } });
    }
    document.querySelectorAll("[data-move]").forEach(function (b) {
      b.addEventListener("click", function () {
        var pos = parseInt(b.dataset.pos, 10), to = b.dataset.move === "up" ? pos - 1 : pos + 1;
        var t = it.resp[pos]; it.resp[pos] = it.resp[to]; it.resp[to] = t;
        it.touched = true;
        afterAnswerChange();
        renderQuiz('[data-move="' + b.dataset.move + '"][data-pos="' + to + '"]');
      });
    });

    on("prevBtn", function () { S.i -= 1; renderQuiz(); window.scrollTo(0, 0); });
    on("nextBtn", function () { S.i += 1; renderQuiz(); window.scrollTo(0, 0); });
    on("checkBtn", doCheck);
    on("flagBtn", function () {
      it.flagged = !it.flagged;
      rec(q.id).flag = it.flagged;
      saveProgress();
      renderQuiz("#flagBtn");
    });
    on("finishBtn", function () { confirmFinish(); });
    on("finishBtn2", function () { confirmFinish(); });
  }
  function afterAnswerChange() {
    var it = S.items[S.i];
    var btn = document.getElementById("checkBtn");
    if (btn) btn.disabled = !isAnswered(it);
    if (S.mode === "exam") refreshStrip();
  }
  function doCheck() {
    var it = S.items[S.i];
    if (!isAnswered(it) || it.checked) return;
    it.checked = true;
    it.correct = evaluate(it);
    record(it);
    saveProgress();
    renderQuiz("#nextBtn, #finishBtn");
    var fbEl = document.querySelector(".feedback");
    if (fbEl && fbEl.scrollIntoView) fbEl.scrollIntoView({ block: "nearest" });
  }
  function confirmFinish() {
    var unanswered = S.items.filter(function (x) { return S.mode === "exam" ? !isAnswered(x) : !x.checked; }).length;
    var msg = S.mode === "exam"
      ? (unanswered ? "You have " + unanswered + " unanswered question(s). Submit the exam anyway?" : "Submit the exam?")
      : "End this session and see your results?";
    if (window.confirm(msg)) finish(false);
  }

  /* ---------- RESULTS ---------- */
  function finish(timedOut) {
    stopTimer();
    S.finished = true;
    S.timedOut = !!timedOut;
    S.elapsed = Math.floor((Date.now() - S.started) / 1000);
    S.items.forEach(function (it) {
      if (S.mode === "exam" && !it.checked) {
        it.checked = true;
        it.correct = isAnswered(it) ? evaluate(it) : false;
        record(it);
      }
    });
    saveProgress();
    renderResults();
    window.scrollTo(0, 0);
  }
  function renderResults() {
    var counted = S.items.filter(function (it) { return it.checked; });
    var right = counted.filter(function (it) { return it.correct; }).length;
    var total = S.mode === "exam" ? S.items.length : counted.length;
    var pct = total ? Math.round((right / total) * 100) : 0;
    var h = "<h2>" + (S.mode === "exam" ? "Exam results" : "Session results") + "</h2>";
    if (S.timedOut) h += '<p class="lede">Time ran out, so unanswered questions were scored as incorrect.</p>';
    h += '<section class="panel"><div class="score"><span class="big">' + pct + '%</span><span>' + right + " of " + total + " correct" +
      (S.mode === "exam" ? " &middot; " + Math.round((right / (total || 1)) * 100) + " / 100 points" : "") +
      " &middot; " + fmtTime(S.elapsed) + "</span></div>";
    if (!total) h += '<p class="empty">You ended the session before checking any answers.</p>';

    var byTopic = {};
    counted.forEach(function (it) {
      var t = it.q.topic;
      byTopic[t] = byTopic[t] || { n: 0, r: 0 };
      byTopic[t].n += 1; if (it.correct) byTopic[t].r += 1;
    });
    var keys = Object.keys(byTopic);
    if (keys.length) {
      h += "<h3>By topic</h3><div class=\"bars\">";
      keys.forEach(function (k) {
        var s = byTopic[k], a = Math.round((s.r / s.n) * 100);
        var cls = a >= 80 ? "hi" : a >= 60 ? "mid" : "low";
        h += '<div class="bar-row"><span>' + esc(topicById[k].label) + '</span><div class="bar" role="img" aria-label="' + a + ' percent correct"><i class="' + cls + '" style="width:' + a + '%"></i></div><span class="num">' + s.r + "/" + s.n + " &middot; " + a + "%</span></div>";
      });
      h += "</div>";
    }
    var missed = counted.filter(function (it) { return !it.correct; });
    h += '<div class="actions">';
    if (missed.length) h += '<button class="btn" type="button" id="retryBtn">Retry ' + missed.length + " missed in Study mode</button>";
    h += '<button class="btn ghost" type="button" id="homeBtn">Back to setup</button></div></section>';

    h += "<h3>Review every question</h3><div class=\"review\">";
    S.items.forEach(function (it, i) {
      var q = it.q;
      h += "<details" + (it.checked && !it.correct ? " open" : "") + "><summary><span class=\"" + (it.correct ? "ok" : "no") + '">' + (it.correct ? "Correct" : "Missed") + "</span><span>" + (i + 1) + ". " + esc(q.q) + "</span></summary><div class=\"body\">";
      h += "<p><strong>Your answer:</strong> " + esc(it.checked || S.mode === "exam" ? respText(it) : "Not answered") + "</p>";
      h += "<p><strong>Correct answer:</strong> " + esc(correctText(q)) + "</p>";
      h += "<p>" + esc(q.why) + '</p><p class="hint">Review: ' + esc(topicById[q.topic].ref) + "</p></div></details>";
    });
    h += "</div>";
    app.innerHTML = h;

    var rb = document.getElementById("retryBtn");
    if (rb) rb.addEventListener("click", function () {
      startSession("study", missed.map(function (it) { return it.q; }), "all");
    });
    document.getElementById("homeBtn").addEventListener("click", renderHome);
  }

  document.getElementById("homeLink").addEventListener("click", function () {
    if (S && !S.finished && !window.confirm("Leave this session? Unchecked answers will be lost.")) return;
    renderHome();
  });

  if (!BANK.length) {
    app.innerHTML = '<p class="empty">The question bank did not load. Make sure data/questions.js is next to index.html.</p>';
  } else {
    renderHome();
  }
})();
