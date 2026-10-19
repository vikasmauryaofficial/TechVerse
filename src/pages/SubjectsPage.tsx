import { InteractiveSubjectGrid } from '@/components/InteractiveSubjectGrid';
import { SubjectLearningResources } from '@/components/SubjectLearningResources';
import { LearningRoadmap } from '@/components/LearningRoadmap';

export function SubjectsPage() {
  return (
    <div>
      <section className="text-center py-16 px-4" style={{ background: 'linear-gradient(135deg, #E0F2FE 0%, #ECFDF5 100%)' }}>
        <h1 className="font-display font-extrabold text-text" style={{ fontSize: 'clamp(32px, 5vw, 48px)' }}>
          Subjects
        </h1>
      </section>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <SubjectLearningResources />
        <section aria-labelledby="all-subjects-heading">
          <h2 id="all-subjects-heading" className="font-display font-bold text-text text-2xl mb-5">All Subjects</h2>
        <InteractiveSubjectGrid />
        </section>
        <LearningRoadmap />
      </div>
    </div>
  );
}
