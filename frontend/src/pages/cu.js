function handleToggleComplete(id) {
  const newList = list
  
  .map((item) => {

    if (item.id === id) {
      
      const updatedItem = {
        ...item,
        isComplete: !item.isComplete,
      };

      return updatedItem;
    }

    return item;
  });

  setList(newList);
}