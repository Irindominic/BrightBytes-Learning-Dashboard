import React, { useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import { useApi } from "../../../hooks/useApi";
import { getAssignments, getQuizzes, getQuizResults } from "../../../utils/api";
import { useAuth } from "../../../context/AuthContext";
import { createQuizResult } from "../../../utils/api";
import toast from "react-hot-toast";

const Tasks = () => {
  const { user } = useAuth();
  const { data: assignments, loading: assignmentsLoading } = useApi(getAssignments);
  const { data: quizzes, loading: quizzesLoading } = useApi(getQuizzes);
  const { data: quizResults, refetch: refetchQuizResults } = useApi(getQuizResults);

  const attemptedQuizIds = (quizResults || [])
    .filter((r) => {
      const sid = typeof r.student_id === "object" ? r.student_id?._id : r.student_id;
      return sid === user?._id;
    })
    .map((r) => (typeof r.quiz_id === "object" ? r.quiz_id?._id : r.quiz_id) || r.quiz_id);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const loading = assignmentsLoading || quizzesLoading;

  const handleQuizSubmit = async () => {
    if (!activeQuiz) return;
    let correct = 0;
    const qs = activeQuiz.questions || [];
    qs.forEach((q, i) => {
      if (Number(answers[i]) === q.correct) correct++;
    });
    setSubmitting(true);
    try {
      await createQuizResult({
        quiz_id: activeQuiz._id,
        student_id: user?._id,
        score: correct,
        total_questions: qs.length,
      });
      toast.success(`Quiz submitted! Score: ${correct}/${qs.length}`);
      setActiveQuiz(null);
      setAnswers({});
      refetchQuizResults();
    } catch (err) {
      toast.error("Failed to submit quiz");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout title="Active Tasks">
      <div className="space-y-6">
        <p className="text-slate-600 dark:text-slate-400">
          Complete quizzes and view assignments.
        </p>

        {activeQuiz ? (
          <div className="w-full max-w-none bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">{activeQuiz.title}</h3>
              <button
                onClick={() => {
                  setActiveQuiz(null);
                  setAnswers({});
                }}
                className="text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
            </div>
            {(activeQuiz.questions || []).map((q, qi) => (
              <div
                key={qi}
                className="p-4 rounded-lg border border-slate-200 dark:border-slate-700"
              >
                <p className="font-medium mb-2">
                  {qi + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {(q.options || []).map((opt, oi) => (
                    <label
                      key={oi}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`q${qi}`}
                        checked={Number(answers[qi]) === oi}
                        onChange={() =>
                          setAnswers((p) => ({ ...p, [qi]: oi }))
                        }
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={handleQuizSubmit}
              disabled={submitting}
              className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Quiz"}
            </button>
          </div>
        ) : (
          <>
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-3">
                Assignments
              </h4>
              {loading ? (
                <div className="text-slate-500">Loading...</div>
              ) : (
                <ul className="space-y-2">
                  {(assignments || []).map((a) => (
                    <li
                      key={a._id}
                      className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    >
                      <div className="font-medium">{a.title}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {a.description}
                      </div>
                      {a.due_date && (
                        <div className="text-xs text-slate-400 mt-1">
                          Due: {new Date(a.due_date).toLocaleDateString()}
                        </div>
                      )}
                    </li>
                  ))}
                  {(assignments || []).length === 0 && (
                    <li className="text-slate-500 py-4">
                      No assignments at the moment.
                    </li>
                  )}
                </ul>
              )}
            </div>

            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-3">
                Quizzes
              </h4>
              <ul className="space-y-2">
                {(quizzes || []).map((q) => {
                  const attempted = attemptedQuizIds.includes(q._id);
                  return (
                    <li
                      key={q._id}
                      className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex justify-between items-center"
                    >
                      <span className="font-medium">{q.title}</span>
                      {attempted ? (
                        <span className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-sm">
                          Already attempted
                        </span>
                      ) : (
                        <button
                          onClick={() => setActiveQuiz(q)}
                          className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                        >
                          Take Quiz
                        </button>
                      )}
                    </li>
                  );
                })}
                {(quizzes || []).length === 0 && (
                  <li className="text-slate-500 py-4">No quizzes available.</li>
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Tasks;
