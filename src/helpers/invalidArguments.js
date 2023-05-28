function invalidArguments(args) {
  if (args.some((item) => item == undefined))
    throw new Error("invalid arguments!");
}

export default invalidArguments;
