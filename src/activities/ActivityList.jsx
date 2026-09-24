import { useAuth } from "../auth/AuthContext";
import { deleteActivity, getActivities } from "../api/activities";


export default function ActivityList({ activities, syncActivities, setError }) {
  const { token } = useAuth();

  const tryDeleteActivity = async (id) => {    
    try {
      await deleteActivity(token, id);
      syncActivities();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <ul>
      {activities.map((activity) => (
        <li key={activity.id}>
          {activity.name}
          {token && <button onClick={() => tryDeleteActivity(activity.id)}>Delete</button>}
        </li>
      ))}
    </ul>
  );
}
