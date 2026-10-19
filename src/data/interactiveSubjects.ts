export interface InteractiveSubject {
  slug: string;
  title: string;
  emoji: string;
  description: string;
  lessons: string;
  tags: string[];
  lessonPath: string;
  practiceSet: string;
  cheatSheet: string[];
  studyNotes: string[];
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
    practiceSet: 'Practice ER modeling, normalization, SQL queries, and transaction schedules in the interactive DBMS lab.',
    cheatSheet: ['ER entities and relationships', 'Normal forms and functional dependencies', 'ACID and serializability'],
    studyNotes: ['Database architecture and data independence', 'Keys, ER-to-relational mapping, and normalization', 'Transactions, concurrency control, and recovery'],
  },
  {
    slug: 'design-analysis-algorithms',
    title: 'Design & Analysis of Algorithms',
    emoji: '⚡',
    description: 'Watch sorting and graph algorithms unfold step by step, and explore greedy methods, dynamic programming, and complexity.',
    lessons: 'Animated algorithm lab',
    tags: ['Sorting', 'Graph algorithms', 'Dynamic programming', 'Big O'],
    lessonPath: '/subjects/design-analysis-algorithms/index.html',
    practiceSet: 'Step through sorting, shortest-path, and minimum-spanning-tree algorithms; compare their complexity.',
    cheatSheet: ['Big-O growth rates', 'Sorting algorithm trade-offs', 'Greedy graph algorithms'],
    studyNotes: ['Algorithm design strategies and complexity analysis', 'Sorting and graph algorithm walkthroughs', 'Greedy methods and dynamic programming'],
  },
  {
    slug: 'oosd-cpp',
    title: 'Object-Oriented System Design with C++',
    emoji: '🧩',
    description: 'Explore object-oriented thinking, UML, C++ design principles, and system modeling with visual interactive lessons.',
    lessons: 'Visual design course',
    tags: ['OOP', 'C++', 'UML', 'System design'],
    lessonPath: '/subjects/oosd-cpp/index.html',
    practiceSet: 'Work through object-oriented modeling, UML flows, and C++ design exercises.',
    cheatSheet: ['Encapsulation, inheritance, and polymorphism', 'UML relationships and diagrams', 'C++ class design'],
    studyNotes: ['Object-oriented analysis and design principles', 'UML modeling and design workflows', 'C++ examples for object-oriented concepts'],
  },
  {
    slug: 'statistical-computing',
    title: 'Statistical Computing',
    emoji: '📈',
    description: 'Understand distributions, correlation, hypothesis tests, Bayesian reasoning, and simulation through live visual labs.',
    lessons: 'Interactive statistics lab',
    tags: ['Statistics', 'R', 'Simulation', 'Data science'],
    lessonPath: '/subjects/statistical-computing/index.html',
    practiceSet: 'Adjust live statistical simulations and explore sampling, inference, and probability.',
    cheatSheet: ['Distributions and sampling', 'Confidence intervals and hypothesis tests', 'Simulation and resampling'],
    studyNotes: ['Statistical computing concepts and methods', 'Probability distributions and estimation', 'Hypothesis testing and simulation'],
  },
  {
    slug: 'data-analytics',
    title: 'Data Analytics',
    emoji: '🔎',
    description: 'Follow the analytics lifecycle and explore statistics, regression, time series, clustering, and big-data concepts with live demos.',
    lessons: '5 interactive units',
    tags: ['Analytics lifecycle', 'Regression', 'Clustering', 'Big Data'],
    lessonPath: '/subjects/data-analytics/index.html',
    practiceSet: 'Explore regression, time-series, clustering, and analytics workflows with browser-based demos.',
    cheatSheet: ['Analytics lifecycle and data types', 'Regression and model evaluation', 'Clustering and big-data workflows'],
    studyNotes: ['Data sources, preparation, and analytics lifecycle', 'Statistical analysis and predictive methods', 'Visualization, clustering, and big data'],
  },
  {
    slug: 'web-technology',
    title: 'Web Technology',
    emoji: '🌐',
    description: 'Learn web foundations, HTML, CSS, JavaScript, networking, Node.js, MongoDB, Servlets, and JSP.',
    lessons: '5 interactive units',
    tags: ['HTML & CSS', 'JavaScript', 'Node.js', 'Servlets'],
    lessonPath: '/subjects/web-technology/index.html',
    practiceSet: 'Follow unit lessons and try the built-in HTML, CSS, JavaScript, and web development exercises.',
    cheatSheet: ['HTML structure and semantic elements', 'CSS selectors and layout', 'JavaScript DOM and events'],
    studyNotes: ['Web foundations and client-server architecture', 'HTML, CSS, and JavaScript fundamentals', 'Node.js, networking, Servlets, and JSP'],
  },
  {
    slug: 'cloud-computing',
    title: 'Cloud Computing',
    emoji: '☁️',
    description: 'Explore cloud service models, virtual machines, storage, networking, and architecture through hands-on demos.',
    lessons: '5 hands-on units',
    tags: ['Cloud models', 'Virtual machines', 'Storage', 'Networking'],
    lessonPath: '/subjects/cloud-computing/index.html',
    practiceSet: 'Try interactive cloud architecture, virtual machine, storage, and networking demonstrations.',
    cheatSheet: ['IaaS, PaaS, and SaaS responsibilities', 'Public, private, and hybrid cloud', 'Compute, storage, and networking'],
    studyNotes: ['Cloud concepts and service models', 'Virtualization, containers, and compute', 'Cloud storage, networking, and architecture'],
  },
  {
    slug: 'data-visualization-python',
    title: 'Data Visualization with Python',
    emoji: '📊',
    description: 'Go from raw data to clear charts with Python, Pandas, Matplotlib, Seaborn, Plotly, and dashboards.',
    lessons: '5 visual units',
    tags: ['Python', 'Pandas', 'Matplotlib', 'Plotly'],
    lessonPath: '/subjects/data-visualization-python/index.html',
    practiceSet: 'Explore chart selection, correlation, distributions, and interactive visualizations.',
    cheatSheet: ['Chart types and when to use them', 'Pandas and Matplotlib essentials', 'Seaborn, Plotly, and dashboard patterns'],
    studyNotes: ['Python data basics and exploratory analysis', 'Statistical and interactive visualization', 'Dashboard design and visual best practices'],
  },
  {
    slug: 'databases',
    title: 'Database Systems',
    emoji: '🗄️',
    description: 'Study SQL, PostgreSQL, and MongoDB with guided topics, practical queries, demos, and quizzes.',
    lessons: 'SQL · PostgreSQL · MongoDB',
    tags: ['SQL', 'PostgreSQL', 'MongoDB', 'Query practice'],
    lessonPath: '/subjects/databases/index.html',
    practiceSet: 'Write and run SQL, PostgreSQL, and MongoDB queries against the interactive sample data.',
    cheatSheet: ['SELECT, WHERE, JOIN, and GROUP BY', 'PostgreSQL query patterns', 'MongoDB filters and aggregation'],
    studyNotes: ['Relational querying and table design', 'PostgreSQL and SQL concepts', 'MongoDB documents and aggregation'],
  },
];
