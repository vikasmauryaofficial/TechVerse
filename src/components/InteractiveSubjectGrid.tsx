import { Link } from 'react-router-dom';
import { interactiveSubjects } from '@/data/interactiveSubjects';

export function InteractiveSubjectGrid() {
  return (
    <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
      {interactiveSubjects.map((subject) => (
        <Link
          key={subject.slug}
          to={`/subjects/${subject.slug}`}
          className="card-hover group flex flex-col"
        >
          <div className="flex items-start gap-3 mb-4">
            <span className="w-12 h-12 rounded-xl bg-green-light flex items-center justify-center text-2xl" aria-hidden="true">
              {subject.emoji}
            </span>
            <div className="min-w-0">
              <h3 className="font-display font-bold text-text group-hover:text-green transition-colors">
                {subject.title}
              </h3>
              <p className="text-xs font-semibold text-green mt-1">{subject.lessons}</p>
            </div>
          </div>
          <p className="text-sm text-muted leading-relaxed flex-1">{subject.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {subject.tags.map((tag) => (
              <span key={tag} className="badge-blue">{tag}</span>
            ))}
          </div>
          <span className="text-sm font-semibold text-green mt-5">Start interactive lessons →</span>
        </Link>
      ))}
    </div>
  );
}
