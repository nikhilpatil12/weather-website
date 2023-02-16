import React, { createContext } from "react";

const DayWeekContext = createContext({
    view: '',
    setView:() => {}
});

export {DayWeekContext};