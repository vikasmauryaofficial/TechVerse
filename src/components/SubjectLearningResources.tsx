import { Link } from 'react-router-dom';
import { interactiveSubjects } from '@/data/interactiveSubjects';

const resourceSections = [
  {
    id: 'practice-sets',
    title: 'Subject-wise Practice Sets',
    emoji: '✏️',
    description: 'Hands-on exercises and interactive labs for every subject.',
    contentKey: 'practiceSet',
  },
  {
    id: 'cheat-sheets',
    title: 'Subject-wise Cheat Sheets',
    emoji: '📋',
    description: 'Quick-reference concepts organized by subject.',
    contentKey: 'cheatSheet',
  },
  {
    id: 'subject-notes',
    title: 'Subject-wise Notes',
    emoji: '📄',
    description: 'Concise study notes to review each subject’s core topics.',
    contentKey: 'studyNotes',
  },
] as const;

export function SubjectLearningResources() {
  return (
    <div className="mb-14">
      <nav aria-label="Jump to subject resources" className="flex flex-wrap gap-2 mb-8">
        {resourceSections.map((resource) => (
          <a key={resource.id} href={`#${resource.id}`} className="pill-tab pill-tab-idle">
            <span aria-hidden="true">{resource.emoji}</span> {resource.title.replace('Subject-wise ', '')}
          </a>
        ))}
      </nav>

      {resourceSections.map((resource) => (
        <section key={resource.id} id={resource.id} className="mb-10 scroll-mt-6" aria-labelledby={`${resource.id}-heading`}>
          <div className="mb-5">
            <h2 id={`${resource.id}-heading`} className="font-display font-bold text-text text-2xl">
              <span aria-hidden="true">{resource.emoji} </span>{resource.title}
            </h2>
            <p className="text-sm text-muted mt-1">{resource.description}</p>
          </div>
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
            {interactiveSubjects.map((subject) => {
              const content = subject[resource.contentKey];
              return (
                <article key={subject.slug} className="card-hover flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-xl bg-green-light flex items-center justify-center text-xl" aria-hidden="true">
                      {subject.emoji}
                    </span>
                    <h3 className="font-display font-semibold text-text">{subject.title}</h3>
                  </div>
                  {Array.isArray(content) ? (
                    <ul className="space-y-1.5 text-sm text-muted flex-1">
                      {content.map((item) => <li key={item}>• {item}</li>)}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted leading-relaxed flex-1">{content}</p>
                  )}
                  <Link to={`/subjects/${subject.slug}`} className="text-sm font-semibold text-green hover:underline mt-4">
                    {resource.contentKey === 'practiceSet' ? 'Start practice →' : 'Open subject lessons →'}
                  </Link>
                </article>
              );
            })}
          </div>
          {resource.id === 'subject-notes' && (
            <Link to="/notes" className="inline-flex text-sm font-semibold text-green hover:underline mt-5">
              Browse downloadable notes →
            </Link>
          )}
        </section>
      ))}
    </div>
  );
}
