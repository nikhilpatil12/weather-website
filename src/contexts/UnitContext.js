import { createContext } from "react";

const UnitContext = createContext({
    unit: 'fahrenheit',
    setUnit:() => {}
});

export {UnitContext};