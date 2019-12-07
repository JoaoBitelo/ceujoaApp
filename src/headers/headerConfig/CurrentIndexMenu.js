var index = 0;

class CurrentIndexMenu {

  setIndex = async (newIndex) => {
    try{
        index = newIndex;
    }catch{
        console.warn("error")
    }
    
  }

  getIndex = async () => {
    return index;
  }
}
export default CurrentIndexMenu;