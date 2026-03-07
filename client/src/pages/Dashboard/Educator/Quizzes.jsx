import React, { useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import { useCourses } from "../../../hooks/useCourses";
import { useApi } from "../../../hooks/useApi";
import { createQuiz, getQuizzes } from "../../../utils/api";
import toast from "react-hot-toast";

const Quizzes = () => {
  const { data: courses } = useCourses();
  const { data: quizzes, refetch: refetchQuizzes } = useApi(getQuizzes);
  const [quizForm, setQuizForm] = useState({
    title: "",
    course_id: "",
    questions: [{ question: "", options: ["", "", ""], correct: 0 }],
  });
  const [submitting, setSubmitting] = useState(false);

  const handleQuizSubmit = async (e) => {
    e.preventDefault();
    const qs = quizForm.questions
      .filter((q) => q.question.trim())
      .map((q) => ({
        question: q.question,
        options: q.options.filter((o) => o.trim()),
        correct: q.correct,
      }));
    if (qs.length === 0) {
      toast.error("Add at least one question");
      return;
    }
    setSubmitting(true);
    try {
      await createQuiz({
        title: quizForm.title,
        course_id: quizForm.course_id || undefined,
        questions: qs,
        created_by: null,
      });
      toast.success("Quiz created");
      setQuizForm({
        title: "",
        course_id: "",
        questions: [{ question: "", options: ["", "", ""], correct: 0 }],
      });
      refetchQuizzes();
    } catch (err) {
      toast.error("Failed to create quiz");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout title="Quizzes">
      <div className="space-y-6 max-w-xl">
        <form onSubmit={handleQuizSubmit} className="space-y-4">
          <input
            required
            placeholder="Quiz title"
            value={quizForm.title}
            onChange={(e) =>
              setQuizForm((p) => ({ ...p, title: e.target.value }))
            }
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
          />
          <select
            value={quizForm.course_id}
            onChange={(e) =>
              setQuizForm((p) => ({ ...p, course_id: e.target.value }))
            }
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
          >
            <option value="">Select course</option>
            {(courses || []).map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>
          {quizForm.questions.map((q, qi) => (
            <div
              key={qi}
              className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 space-y-2"
            >
              <input
                placeholder="Question"
                value={q.question}
                onChange={(e) => {
                  const n = [...quizForm.questions];
                  n[qi] = { ...n[qi], question: e.target.value };
                  setQuizForm((p) => ({ ...p, questions: n }));
                }}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
              />
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Set correct answer (select one per question):
              </p>
              {q.options.map((opt, oi) => (
                <div key={oi} className="flex items-center gap-2">
                  <label className="flex items-center gap-2 shrink-0 cursor-pointer">
                    <input
                      type="radio"
                      name={`q${qi}`}
                      checked={q.correct === oi}
                      onChange={() => {
                        const n = [...quizForm.questions];
                        n[qi] = { ...n[qi], correct: oi };
                        setQuizForm((p) => ({ ...p, questions: n }));
                      }}
                      title="Set as correct answer"
                    />
                    <span
                      className={
                        q.correct === oi
                          ? "text-emerald-600 dark:text-emerald-400 font-medium text-sm"
                          : "text-slate-500 text-sm"
                      }
                    >
                      {q.correct === oi ? "✓ Correct" : "○"}
                    </span>
                  </label>
                  <input
                    placeholder={`Option ${oi + 1}`}
                    value={opt}
                    onChange={(e) => {
                      const n = [...quizForm.questions];
                      const opts = [...n[qi].options];
                      opts[oi] = e.target.value;
                      n[qi] = { ...n[qi], options: opts };
                      setQuizForm((p) => ({ ...p, questions: n }));
                    }}
                    className="flex-1 px-4 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const n = quizForm.questions.filter((_, i) => i !== qi);
                  setQuizForm((p) => ({ ...p, questions: n }));
                }}
                className="text-sm text-red-500"
              >
                Remove question
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setQuizForm((p) => ({
                ...p,
                questions: [
                  ...p.questions,
                  { question: "", options: ["", "", ""], correct: 0 },
                ],
              }))
            }
            className="text-indigo-600 dark:text-indigo-400"
          >
            + Add question
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="block px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            Create Quiz
          </button>
        </form>
        <div>
          <h4 className="font-medium mb-2">Recent Quizzes</h4>
          <ul className="space-y-2">
            {(quizzes || []).slice(0, 5).map((q) => (
              <li
                key={q._id}
                className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800"
              >
                {q.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Quizzes;
