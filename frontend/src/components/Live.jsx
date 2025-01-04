import React from "react";
import axios from "axios";

export default function Live({ setIsLive }) {


  const goLive = async () => {
    const options = {
      method: "POST",
      url: "https://api.zoom.us/v2/rooms",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_SECRET_TOKEN",
      },
      data: {
        location_id: "49D7a0xPQvGQ2DCMZgSe7w",
        name: "My Personal Meeting Room",
        type: "ZoomRoom",
        calendar_resource_id: "u7GQ3q_zQbqJnNp02-oMjQ",
        tag_ids: [
          "90bdda6c226f4f10a4b9a34be8d69f30",
          "1234ds6c226f4f10a4b9a34be8d69f30",
        ],
      },
    };
    try {
      const { data } = await axios.request(options);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <button onClick={goLive}>click me</button>
      </div>
    </div>
  );
}
