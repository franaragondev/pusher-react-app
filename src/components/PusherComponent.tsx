import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import "./PusherComponent.css";

interface Notification {
  message: string;
  [key: string]: unknown;
}

function PusherComponent() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const pusher = new Pusher("485acb5396f3a36a3f94", {
      cluster: "eu",
      forceTLS: true,
    });

    const channel = pusher.subscribe("my-channel");

    channel.bind("my-event", (data: Notification) => {
      setNotifications((prev) => [...prev, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);

  return (
    <div className="pusher-container">
      <h2>🔔 Real-Time Notifications</h2>
      <div className="notifications">
        {notifications.length === 0 && <p>No notifications yet.</p>}
        {notifications.map((n, i) => (
          <div key={i} className="notification">
            {n.message || JSON.stringify(n)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PusherComponent;
