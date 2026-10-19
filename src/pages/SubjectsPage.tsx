import { InteractiveSubjectGrid } from '@/components/InteractiveSubjectGrid';

export function SubjectsPage() {
  return (
    <div>
      <section className="text-center py-16 px-4" style={{ background: 'linear-gradient(135deg, #E0F2FE 0%, #ECFDF5 100%)' }}>
        <p className="text-sm font-semibold uppercase tracking-wider text-green mb-2">Learn by doing</p>
        <h1 className="font-display font-extrabold text-text" style={{ fontSize: 'clamp(32px, 5vw, 48px)' }}>
          Interactive Subjects
        </h1>
        <p className="text-muted text-lg mt-3 max-w-2xl mx-auto">
          Explore visual lessons, live demonstrations, code practice, and quizzes across four subjects.
        </p>
      </section>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <InteractiveSubjectGrid />
      </div>
    </div>
  );
}
