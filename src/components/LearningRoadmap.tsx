import { Link } from 'react-router-dom';

const roadmapSteps = [
  { title: 'Choose a subject', description: 'Pick a topic that matches your learning goal.', link: '/subjects', action: 'Explore subjects' },
  { title: 'Learn the concepts', description: 'Follow lessons, visual examples, and course material.', link: '/courses', action: 'Browse courses' },
  { title: 'Practice hands-on', description: 'Apply the concepts with interactive demos and exercises.', link: '/subjects', action: 'Start practicing' },
  { title: 'Build your skills', description: 'Strengthen problem-solving and prepare for real projects.', link: '/arena', action: 'Practice coding' },
  { title: 'Get career-ready', description: 'Prepare for interviews, placements, and your next role.', link: '/placement', action: 'Explore placement prep' },
];

export function LearningRoadmap() {
  return (
    <section className="mt-14" aria-labelledby="learning-roadmap-heading">
      <div className="mb-5">
        <p className="text-sm font-semibold text-green mb-1">Your learning journey</p>
        <h2 id="learning-roadmap-heading" className="font-display font-bold text-text text-2xl">Learning Roadmap</h2>
        <p className="text-sm text-muted mt-1">A clear path from choosing a subject to becoming career-ready.</p>
      </div>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {roadmapSteps.map((step, index) => (
          <li key={step.title} className="card relative">
            <span className="w-9 h-9 rounded-full bg-green text-white flex items-center justify-center font-bold mb-4">
              {index + 1}
            </span>
            <h3 className="font-display font-semibold text-text mb-2">{step.title}</h3>
            <p className="text-sm text-muted mb-4">{step.description}</p>
            <Link to={step.link} className="text-sm font-semibold text-green hover:underline">
              {step.action} →
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
