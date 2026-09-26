# Study plan: from this project to inference / ML engineer

Eight weeks, about 10 hours a week: 1 hour of reading or video, 1 hour hands-on in this repo, most days. Every week has a
concept, the file in this repo where it lives, an experiment whose result shows up on the dashboard, and one outside resource.
Karpathy's free "Neural Networks: Zero to Hero" videos are the spine; DeepLearning.AI courses fill gaps.

| week | concept | where it lives here | experiment (deliverable) | resource |
|---|---|---|---|---|
| 1 | Loss, gradient descent, learning rate, epochs vs steps, overfitting | `scripts/train_lora.py` (Trainer args), `runs/asr-mms-gbm-r1/log.tsv` (the epoch-3 overfit) | Re-run the ASR round-1 recipe with lr 5e-4 and 2e-3; plot WER per epoch; explain which overfit and why | Karpathy: micrograd + makemore part 1; DL.AI ML Specialization course 1 |
| 2 | Tokens and tokenizers, why Sarvam packs Garhwali 1.8× tighter, embeddings | `packed into N sequences` lines in run logs; `AutoTokenizer` in `train_lora.py` | Tokenise 1,000 Garhwali sentences with Qwen, Sarvam, Gemma; table of tokens/word; explain the cost implication | Karpathy: "Let's build the GPT tokenizer" |
| 3 | The transformer: attention, KV cache, why decoding is memory-bound | `scripts/eval_translate.py` (generate), `~/bench-gb10` (your own bandwidth benchmark) | Measure tokens/s for Qwen3-8B at batch 1, 8, 32 on the Spark; derive achieved GB/s; compare with the 273 GB/s ceiling | Karpathy: "Let's build GPT"; Jay Alammar, The Illustrated Transformer |
| 4 | Fine-tuning: full vs LoRA vs QLoRA, rank, which layers, learning-rate schedules | `get_peft_model` block, `--qlora` flag in `train_lora.py` | Pilot-size run at rank 8 vs 64; score both on the gold set; write the trade-off in two paragraphs | LoRA paper (Hu 2021), QLoRA paper (Dettmers 2023); DL.AI "Finetuning LLMs" |
| 5 | Evaluation and data-centric ML: chrF/BLEU/WER, held-out sets, why 2.5× more text gave +0.1 | `scripts/eval_translate.py`, `eval/flores_test.jsonl`, `RESEARCH.md`, the full-run journal entry | Build a 100-sentence conversational test set with your parents; score every model on it; compare ranking with FLORES | sacrebleu docs; Andrew Ng, "Data-centric AI" talk |
| 6 | Speech: CTC loss, wav2vec2/MMS, confidence, pseudo-labelling and self-training | `scripts/asr_finetune.py`, `scripts/asr_transcribe.py`, `filter_asr_text.py` | Vary the pseudo-label confidence gate (0.8 / 0.9 / 0.95) and count; run one round; report WER vs gate | Graves 2006 CTC paper (skim), Hugging Face audio course units 1-5 |
| 7 | Inference engineering: quantisation (GGUF/AWQ/FP8), batching, vLLM vs llama.cpp, latency budgets | your `bench-gb10`, `ollama` on the box, `scripts/s2s.py` | Serve the best adapter merged into Sarvam-M with vLLM and with llama.cpp Q4; measure first-token latency and tokens/s; pick one for the demo and say why | vLLM docs (PagedAttention blog), llama.cpp README, "LLM inference math" posts (kipply) |
| 8 | Productising: streaming ASR, a persistent API, containers, model cards, benchmarks people trust | `demo/`, `RUNBOOK.md`, dashboard | Persistent speech-to-speech server (FastAPI + mic page), Dockerfile, Hugging Face model card with numbers and licences, one blog post | Hugging Face model card guide; FastAPI docs |

## How this maps to the job
- **Inference engineer** = weeks 3, 7, 8. The portfolio piece is a public benchmark of the Garhwali model on the Spark
  with achieved bandwidth, plus a serving stack that other people can run. Nobody else has this box and this model.
- **ML engineer** = weeks 1, 4, 5, 6. The portfolio piece is the evaluation report: what moved the score and what did not,
  with numbers, which is rarer than another fine-tune.
- **Credential** = merged pull requests and public numbers, not certificates. Candidates: add Garhwali to sacrebleu's
  language list is not needed, but adding `gbm` support to an open ASR or MT project, or publishing the corpus and eval, is.

## Habits that make it stick
- Before every run, write one sentence predicting the number. After, write what happened. The journal on the dashboard
  is the right place; the gap between prediction and result is the learning.
- Read one script fully each week and change one thing in it.
- Explain the week's concept to your parents in Garhwali. If you cannot, you do not have it yet.
