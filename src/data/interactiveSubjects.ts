export interface InteractiveSubject {
  slug: string;
  title: string;
  emoji: string;
  description: string;
  lessons: string;
  tags: string[];
  lessonPath: string;
}

export const interactiveSubjects: InteractiveSubject[] = [
  {
    slug: 'dbms',
    title: 'Database Management Systems',
    emoji: '🗃️',
    description: 'Master database design, ER modeling, SQL, normalization, transactions, and concurrency with interactive diagrams and labs.',
    lessons: 'Interactive DBMS lab',
    tags: ['ER model', 'SQL', 'Normalization', 'Transactions'],
    lessonPath: '/subjects/dbms/index.html',
  },
  {
    slug: 'design-analysis-algorithms',
    title: 'Design & Analysis of Algorithms',
    emoji: '⚡',
    description: 'Watch sorting and graph algorithms unfold step by step, and explore greedy methods, dynamic programming, and complexity.',
    lessons: 'Animated algorithm lab',
    tags: ['Sorting', 'Graph algorithms', 'Dynamic programming', 'Big O'],
    lessonPath: '/subjects/design-analysis-algorithms/index.html',
  },
  {
    slug: 'oosd-cpp',
    title: 'Object-Oriented System Design with C++',
    emoji: '🧩',
    description: 'Explore object-oriented thinking, UML, C++ design principles, and system modeling with visual interactive lessons.',
    lessons: 'Visual design course',
    tags: ['OOP', 'C++', 'UML', 'System design'],
    lessonPath: '/subjects/oosd-cpp/index.html',
  },
  {
    slug: 'statistical-computing',
    title: 'Statistical Computing',
    emoji: '📈',
    description: 'Understand distributions, correlation, hypothesis tests, Bayesian reasoning, and simulation through live visual labs.',
    lessons: 'Interactive statistics lab',
    tags: ['Statistics', 'R', 'Simulation', 'Data science'],
    lessonPath: '/subjects/statistical-computing/index.html',
  },
  {
    slug: 'data-analytics',
    title: 'Data Analytics',
    emoji: '🔎',
    description: 'Follow the analytics lifecycle and explore statistics, regression, time series, clustering, and big-data concepts with live demos.',
    lessons: '5 interactive units',
    tags: ['Analytics lifecycle', 'Regression', 'Clustering', 'Big Data'],
    lessonPath: '/subjects/data-analytics/index.html',
  },
  {
    slug: 'web-technology',
    title: 'Web Technology',
    emoji: '🌐',
    description: 'Learn web foundations, HTML, CSS, JavaScript, networking, Node.js, MongoDB, Servlets, and JSP.',
    lessons: '5 interactive units',
    tags: ['HTML & CSS', 'JavaScript', 'Node.js', 'Servlets'],
    lessonPath: '/subjects/web-technology/index.html',
  },
  {
    slug: 'cloud-computing',
    title: 'Cloud Computing',
    emoji: '☁️',
    description: 'Explore cloud service models, virtual machines, storage, networking, and architecture through hands-on demos.',
    lessons: '5 hands-on units',
    tags: ['Cloud models', 'Virtual machines', 'Storage', 'Networking'],
    lessonPath: '/subjects/cloud-computing/index.html',
  },
  {
    slug: 'data-visualization-python',
    title: 'Data Visualization with Python',
    emoji: '📊',
    description: 'Go from raw data to clear charts with Python, Pandas, Matplotlib, Seaborn, Plotly, and dashboards.',
    lessons: '5 visual units',
    tags: ['Python', 'Pandas', 'Matplotlib', 'Plotly'],
    lessonPath: '/subjects/data-visualization-python/index.html',
  },
  {
    slug: 'databases',
    title: 'Database Systems',
    emoji: '🗄️',
    description: 'Study SQL, PostgreSQL, and MongoDB with guided topics, practical queries, demos, and quizzes.',
    lessons: 'SQL · PostgreSQL · MongoDB',
    tags: ['SQL', 'PostgreSQL', 'MongoDB', 'Query practice'],
    lessonPath: '/subjects/databases/index.html',
  },
];
