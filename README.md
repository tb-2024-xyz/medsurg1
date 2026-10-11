# NUR 285 Exam 1 Prep

A small, offline quiz app for NUR 285 Exam 1. It has 129 questions drawn from the *2-Day Complete Study Guide* and covers every blueprint area:

- Fluids and electrolytes (Ch. 3): fluid balance, Na/K/Ca/Mg/PO4, acid-base and ABGs
- Diabetes mellitus (Ch. 29): foundations, acute complications, chronic complications
- Renal, urologic, and male reproductive (Ch. 27, 33): prostatitis, BPH, prostate cancer, UTI, bladder cancer

There is no build step and no dependencies. Open `index.html` in a browser.

## Modes

| Mode | What it does |
|---|---|
| **Study** | One question at a time with instant rationale and a pointer back to the study guide session |
| **Exam** | Timed (90 seconds per question), no feedback until you submit, scored as a percentage and out of 100 |
| **Marathon** | Every question in your chosen topics, with feedback; end whenever you want |

You can filter by topic, and by all questions, not yet answered, missed last time, or flagged. After any session, **Retry missed** starts a new Study session with only the questions you got wrong. A rhythm strip across the top shows progress: green beats are correct, red are wrong, dashed beats are flagged.

Question types match the exam format: multiple choice, select all that apply, fill in the blank, and ordering.

Progress, accuracy by topic, and flags are saved in your browser's local storage. Use **Reset saved progress** on the setup screen to clear them.

## Files

```
index.html          page shell
css/styles.css      styles (light and dark, mobile friendly)
js/app.js           modes, grading, results, saved progress
data/questions.js   topics and the question bank
```

## Adding or editing questions

Open `data/questions.js` and add a line using one of the helpers:

```js
mc("lytes", "Question stem?", ["A", "B", "C", "D"], 0, "Rationale shown after answering.");
sata("dm-acute", "Select all that apply.", ["A", "B", "C", "D"], [0, 2], "Rationale.");
fill("acidbase", "Normal pH range?", ["7.35-7.45", "7.35 to 7.45"], "Rationale.");
order("dm-acute", "Put the steps in order.", ["First", "Second", "Third"], "Rationale.");
```

The first argument is a topic id from the `TOPICS` list at the top of the file. For `mc` the answer is the index of the correct option; for `sata` it is a list of indexes; for `order`, list the items in the correct order and the app shuffles them for display. Progress is keyed to a hash of the question stem, so changing a stem resets that question's history.

## Hosting it

Because it is plain static files, you can publish it free with GitHub Pages: push the folder to a repository, then turn on Pages for the main branch in the repository settings.

## Content note

Questions follow the study guide, which follows your lecture slides. Details the guide marks **[+]** (such as insulin onset, peak, and duration values) come from standard references, so confirm them against your textbook and ATI. Where your slides differ from other references, such as the A1C diagnostic cutoff of 7%, the questions use the slide value.
