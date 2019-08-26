import React from "react";
import { shallow } from "enzyme";
import { User } from "components/user/user";

describe("User", () => {
  it("should render correctly", () => {
    const user = {
      firstname: "Oscar",
      lastname: "Granada",
      fullname: "Oscar Granada",
      picture: "http://fake.path"
    };
    const component = shallow(<User user={user} />);
    expect(component).toMatchSnapshot();
  });
});
