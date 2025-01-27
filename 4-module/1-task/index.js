function makeFriendsList(friends) {
  const ulElement = document.createElement('ul');

  for (let i = 0; i < friends.length; i++) {
    const friend = friends[i];
    const fullName = `${friend.firstName} ${friend.lastName}`;
    const li = document.createElement('li');
    li.innerHTML = fullName;
    ulElement.append(li);
  }

  return ulElement;
}
