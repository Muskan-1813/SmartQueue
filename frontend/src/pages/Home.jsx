import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-white dark:bg-slate-900 p-8 shadow-sm dark:shadow-slate-900/50 border border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <p className="text-sm font-semibold uppercase text-brand dark:text-brand-light">
          Smart Queue Management
        </p>
        <h1 className="mt-2 text-4xl font-bold text-slate-900 dark:text-slate-100">
          Skip the line. Join smart, real-time queues.
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          SmartQueue lets you join queues with one tap,
          and keeps everyone in sync with live now-serving updates.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/register"
            className="rounded-md bg-brand-dark dark:bg-brand px-5 py-2 text-white hover:bg-brand dark:hover:bg-brand-light transition-colors duration-200"
          >
            Get started
          </Link>
        </div>
        <div className="mt-6 flex gap-6 text-sm text-slate-500 dark:text-slate-400">
          <div>
            <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Realtime</p>
            <p>Socket-driven updates for staff and users.</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Analytics</p>
            <p>Measure wait times, satisfaction, and throughput.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

