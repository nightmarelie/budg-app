import { createFixture } from "./fixture";
import { fromAny, fromPartial, fromExact } from "./testHelper";

type User = {
  id: string;
  name: string;
};

const func = (user: User) => {};

const baseUser = createFixture<User>().set({
  id: "123123",
  name: "awdawd",
});

it("Should work", () => {
  func(baseUser.fromExact({}));
});
