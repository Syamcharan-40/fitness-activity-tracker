import { useMemo, useState } from 'react';
import {
  Activity, Footprints, Flame, Clock3, Route, Plus, Bike,
  Waves, Dumbbell, PersonStanding, CalendarDays, Target, X
} from 'lucide-react';

const initialActivities = [
  { id: 1, name: 'Morning walk', type: 'Walking', duration: 25, calories: 125, steps: 3200, time: '7:15 AM' },
  { id: 2, name: 'Cycling', type: 'Cycling', duration: 20, calories: 160, steps: 0, time: '1:10 PM' },
  { id: 3, name: 'Evening workout', type: 'Workout', duration: 30, calories: 210, steps: 1800, time: '5:40 PM' },
];

const activityOptions = {
  Walking: { rate: 5, icon: PersonStanding, color: 'orange' },
  Running: { rate: 10, icon: Footprints, color: 'pink' },
  Cycling: { rate: 8, icon: Bike, color: 'blue' },
  Swimming: { rate: 9, icon: Waves, color: 'purple' },
  Workout: { rate: 7, icon: Dumbbell, color: 'green' },
};

function MetricCard({ title, value, unit, note, icon: Icon, color, progress }) {
  return (
    <article className="metric-card">
      <div className="metric-top">
        <span className={`metric-icon ${color}`}><Icon size={20} /></span>
        <span className="metric-note">{note}</span>
      </div>
      <p className="metric-title">{title}</p>
      <div className="metric-value">{value}<span>{unit}</span></div>
      <div className="progress-track"><div className={`progress-fill ${color}`} style={{ width: `${Math.min(progress, 100)}%` }} /></div>
    </article>
  );
}

function App() {
  const [activities, setActivities] = useState(initialActivities);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: 'Walking', duration: '20', steps: '2000' });

  const totals = useMemo(() => activities.reduce((sum, item) => ({
    calories: sum.calories + item.calories,
    steps: sum.steps + item.steps,
    minutes: sum.minutes + item.duration,
  }), { calories: 0, steps: 0, minutes: 0 }), [activities]);

  const distance = (totals.steps * 0.000762).toFixed(1);
  const goal = 8000;
  const stepPercent = Math.min((totals.steps / goal) * 100, 100);

  function addActivity(event) {
    event.preventDefault();
    const duration = Math.max(1, Number(form.duration) || 1);
    const steps = form.type === 'Cycling' || form.type === 'Swimming' ? 0 : Math.max(0, Number(form.steps) || 0);
    const calories = Math.round(duration * activityOptions[form.type].rate);
    const time = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    setActivities(current => [{ id: Date.now(), name: form.type, type: form.type, duration, calories, steps, time }, ...current]);
    setForm({ type: 'Walking', duration: '20', steps: '2000' });
    setShowForm(false);
  }

  function removeActivity(id) {
    setActivities(current => current.filter(activity => activity.id !== id));
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark"><Activity size={22} /></span><span>fittrack</span></div>
        <div className="nav-label">MENU</div>
        <div className="nav-item active"><span>▦</span> Dashboard</div>
        <div className="nav-item"><Footprints size={18} /> My activities</div>
        <div className="nav-item"><Target size={18} /> Goals</div>
        <div className="sidebar-bottom">
          <div className="side-quote">“Small steps every day lead to big results.”</div>
          <div className="profile"><div className="avatar">S</div><div><strong>My Profile</strong><small>Fitness journey</small></div></div>
        </div>
      </aside>

      <section className="main-content">
        <header className="topbar">
          <div><p className="eyebrow">MONITOR YOUR PROGRESS</p><h1>Daily Activity</h1><p className="subtitle">Every move counts. Keep going!</p></div>
          <div className="date-pill"><CalendarDays size={17} /> {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</div>
        </header>

        <section className="welcome-banner">
          <div className="welcome-copy"><span className="banner-tag">YOUR DAILY SNAPSHOT</span><h2>Hey there, champion! <span>✦</span></h2><p>You're building healthy habits, one activity at a time.</p><div className="banner-stats"><div><strong>{totals.calories.toLocaleString()}</strong><small>kcal burned</small></div><div><strong>{totals.minutes}</strong><small>active minutes</small></div></div></div>
          <div className="banner-art"><div className="sun"></div><div className="art-circle"><PersonStanding size={86} strokeWidth={1.5} /></div><div className="art-leaf leaf-one"></div><div className="art-leaf leaf-two"></div></div>
        </section>

        <div className="section-heading"><div><h2>Today's overview</h2><p>Here's how active you've been today.</p></div><span className="live-dot">● Updated live</span></div>
        <section className="metrics-grid">
          <MetricCard title="Steps taken" value={totals.steps.toLocaleString()} unit=" steps" note={`${Math.round(stepPercent)}% of goal`} icon={Footprints} color="orange" progress={stepPercent} />
          <MetricCard title="Calories burned" value={totals.calories.toLocaleString()} unit=" kcal" note="Estimated" icon={Flame} color="pink" progress={(totals.calories / 600) * 100} />
          <MetricCard title="Active time" value={totals.minutes} unit=" min" note="Keep it up" icon={Clock3} color="blue" progress={(totals.minutes / 90) * 100} />
          <MetricCard title="Distance" value={distance} unit=" km" note="From steps" icon={Route} color="purple" progress={(Number(distance) / 6) * 100} />
        </section>

        <section className="lower-grid">
          <article className="panel goal-panel">
            <div className="panel-heading"><div><h2>Step goal</h2><p>Daily target progress</p></div><span className="goal-icon"><Target size={20} /></span></div>
            <div className="goal-number">{totals.steps.toLocaleString()} <span>/ {goal.toLocaleString()} steps</span></div>
            <div className="goal-track"><div style={{ width: `${stepPercent}%` }} /></div>
            <div className="goal-footer"><span>{Math.max(goal - totals.steps, 0).toLocaleString()} steps to go</span><strong>{Math.round(stepPercent)}%</strong></div>
            <div className="tip"><span>💡</span><p><strong>Quick tip</strong><br />A short walk after meals can help you stay active throughout the day.</p></div>
          </article>

          <article className="panel activity-panel">
            <div className="panel-heading"><div><h2>Recent activities</h2><p>Your movement timeline</p></div><button className="add-button" onClick={() => setShowForm(true)}><Plus size={17} /> Add activity</button></div>
            <div className="activity-list">
              {activities.length === 0 ? <div className="empty-state">No activities yet. Add one to get started!</div> : activities.map(item => {
                const Icon = activityOptions[item.type]?.icon || Activity;
                const color = activityOptions[item.type]?.color || 'blue';
                return <div className="activity-row" key={item.id}><span className={`activity-icon ${color}`}><Icon size={20} /></span><div className="activity-info"><strong>{item.name}</strong><small>{item.time} · {item.duration} min</small></div><div className="activity-calories"><strong>{item.calories} kcal</strong><small>burned</small></div><button className="remove-button" title="Remove activity" onClick={() => removeActivity(item.id)}><X size={15} /></button></div>;
              })}
            </div>
          </article>
        </section>
        <footer>FitTrack <span>•</span> Stay active, stay healthy <span className="disclaimer">Calories are estimates for learning/demo purposes.</span></footer>
      </section>

      {showForm && <div className="modal-backdrop" onClick={() => setShowForm(false)}><section className="modal" onClick={event => event.stopPropagation()}><div className="modal-heading"><div><h2>Add activity</h2><p>Record a little progress today.</p></div><button className="close-modal" onClick={() => setShowForm(false)}><X size={20} /></button></div><form onSubmit={addActivity}><label>Activity type<select value={form.type} onChange={event => setForm({ ...form, type: event.target.value })}>{Object.keys(activityOptions).map(type => <option key={type}>{type}</option>)}</select></label><label>Duration (minutes)<input type="number" min="1" max="600" required value={form.duration} onChange={event => setForm({ ...form, duration: event.target.value })} /></label>{!['Cycling', 'Swimming'].includes(form.type) && <label>Steps taken<input type="number" min="0" max="100000" value={form.steps} onChange={event => setForm({ ...form, steps: event.target.value })} /></label>}<p className="estimate">Estimated calories: <strong>{Math.round((Number(form.duration) || 0) * activityOptions[form.type].rate)} kcal</strong></p><button className="submit-button" type="submit">Save activity</button></form></section></div>}
    </main>
  );
}

export default App;
