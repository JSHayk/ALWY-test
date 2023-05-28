export default function userDto(data) {
  const { id, email } = data;
  return {
    id,
    email,
  };
}
