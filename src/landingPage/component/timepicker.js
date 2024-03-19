import "rc-time-picker/assets/index.css";
import moment from "moment";
import React, { useState } from "react";
import TimePicker from "rc-time-picker";

const Timepicker = () =>{
    const [data, setData] = useState({
        scheduleStartTime: "",
        scheduleEndTime: "",
      });
    return(
        <>
        <p>time picker</p>
        <div className=" flex items-center">
                <TimePicker
                  showSecond={false}
                  placeholder="Set Time"
                  value={
                    data.scheduleStartTime
                      ? moment(data.scheduleStartTime, "h:mm a")
                      : null
                  }
                  onChange={(value) =>
                    setData({
                      ...data,
                      scheduleStartTime: value ? value.format("h:mm a") : null,
                    })
                  }
                  format="h:mm a"
                  clearText=""
                  clearIcon
                  use12Hours
                />
              

                <p >To</p>

                <TimePicker
                  showSecond={false}
                  placeholder="Set Time"
                  value={
                    data.scheduleEndTime
                      ? moment(data?.scheduleEndTime, "h:mm a")
                      : null
                  }
                  onChange={(value) =>
                    setData({
                      ...data,
                      scheduleEndTime: value ? value.format("h:mm a") : null,
                    })
                  }
                  clearText=""
                  clearIcon
                  format="h:mm a"
                  use12Hours
                />
             
              </div>
        </>
    );
}

export default Timepicker;