import React from "react";
import { shallow } from "enzyme";
import { Userslist } from "components/userslist/userslist";

describe("User", () => {
  it("should render correctly", done => {
    const user = {
      firstname: "Oscar",
      lastname: "Granada",
      fullname: "Oscar Granada",
      picture: "http://fake.path"
    };
    const mockDataProvider = {
      getUsers() {
        return Promise.resolve([user, user, user]);
      }
    };
    const component = shallow(<Userslist dataProvider={mockDataProvider} />);
    const instance = component.instance();
    instance.componentDidMount().then(() => {
      expect(component).toMatchSnapshot();
      done();
    });
  });

  it("should delete an item correctly", done => {
    const user = {
      firstname: "Oscar",
      lastname: "Granada",
      fullname: "Oscar Granada",
      picture: "http://fake.path"
    };
    const mockDataProvider = {
      getUsers() {
        return Promise.resolve([user]);
      },
      deleteUser() {
        return Promise.resolve({});
      }
    };
    const component = shallow(<Userslist dataProvider={mockDataProvider} />);
    const instance = component.instance();
    const instance_deleteUser = jest.spyOn(instance, "deleteUser");
    instance.componentDidMount().then(() => {
      expect(component.text()).toContain("<User />");
      component.find(".Userslist-deleteButton").simulate("click");
      expect(instance_deleteUser).toHaveBeenCalled();
      done();
    });
  });
});
