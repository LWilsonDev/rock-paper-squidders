import React from "react";
import {render} from "@testing-library/react-native";

import Game from "../app/screens/Game";

it("renders Game screen", () => {
  const {getByText} = render(<Game />);
  const gameText = getByText(/GAME/i);
  expect(gameText).not.toBeNull();
});
