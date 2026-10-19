import { Link, useParams } from 'react-router-dom';
import { interactiveSubjects } from '@/data/interactiveSubjects';

export function InteractiveSubjectPage() {
  const { slug } = useParams();
  const subject = interactiveSubjects.find((item) => item.slug === slug);

  if (!subject) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-text mb-3">Subject not found</h1>
        <Link to="/subjects" className="btn-primary">Browse interactive subjects</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <Link to="/subjects" className="text-sm text-muted hover:text-green transition-colors">
            ← All subjects
          </Link>
          <h1 className="font-display font-bold text-text text-xl mt-1">
            <span aria-hidden="true">{subject.emoji} </span>
            {subject.title}
          </h1>
        </div>
        <a
          href={subject.lessonPath}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline text-sm"
        >
          Open lesson in a new tab ↗
        </a>
      </div>
      <iframe
        key={subject.slug}
        src={subject.lessonPath}
        title={`${subject.title} interactive lesson`}
        className="block w-full rounded-xl border border-border bg-card"
        style={{ height: 'min(82vh, 1100px)', minHeight: '640px' }}
      />
    </div>
  );
}
