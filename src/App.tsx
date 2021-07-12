import { Redirect, Route } from 'react-router-dom';
import { IonApp,IonLabel,IonInput,IonItem,IonButton,IonIcon,IonToast,IonHeader,IonToolbar,IonButtons,IonTitle, IonPage,IonContent } from '@ionic/react';
import React,{useState,useEffect} from 'react';
import Navbar from './components/NavBar'
import Todos from "./components/Todos";
import {ITodo} from "./utils/ITodo"
import tasks from "./utils/tasks"
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import SearchForm from './components/SearchForm';

const getLocalStorage=()=>{
    let todos=localStorage.getItem("todos");
    if(todos!==null){
      return JSON.parse(todos);
    }
    else return [];
  }


const App: React.FC = () => {
  const [title,setTitle]=useState<string>("");
  const [desc,setDesc]=useState<string>("");
  const [todos,setTodos]=useState<ITodo[]>(getLocalStorage());
  const [isEditing,setIsEditing]=useState<boolean>(false);
  const [editId,setEditId]=useState<number>()
  const [add,setAdd]=useState<boolean>(false);
  const [isFound,setIsFound]=useState<boolean>(false);
  const [isDeleted,setIsDeleted]=useState<boolean>(false);
  const [isEdited,setIsEdited]=useState<boolean>(false);
  const [isCleared,setIsCleared]=useState<boolean>(false);
  const [searchVal,setSearchVal]=useState<string>("");
  const [filteredTodos,setFilteredTodos]=useState<ITodo[]>(todos);


  // setFilteredTodos(todos);

  // Add Todo
  const addTodo=():void=>{
    if(title==="" || desc==="") {
        setIsFound(true);
        return;
    };
    if(isEditing){
      const newTodo=todos.map((todo:ITodo)=>{
        if(todo.id===editId){
          return {...todo,title,desc};
        }
        else{
          return todo;
        }
      });
      setTodos(newTodo);
      setFilteredTodos(newTodo);
      setTitle("");
      setDesc("");
      setIsEditing(false);
      setIsEdited(true);
      return;
    }
    const newTodo={
      id:Math.floor(Math.random()*10000),
      title,desc
    };
    // console.log({title,desc});
    setTodos([newTodo,...todos]);
    setFilteredTodos([newTodo,...todos]);
    setAdd(true);
    setTitle("");
    setDesc("");
  }

  // removeTask
  const removeTask=(id:number)=>{
    const FilteredTodos=todos.filter((todo:ITodo)=>{
        return (todo.id!==id);
    })
    setTodos(FilteredTodos);
    setFilteredTodos(FilteredTodos);
    setIsDeleted(true);
  }

  // Edit todo
  const editTask=(id:number)=>{
    const findTask=todos.find((todo:ITodo)=>todo.id===id);
    console.log(findTask);
    setTitle(findTask!.title);
    setDesc(findTask!.desc);
    setIsEditing(true);
    setEditId(id);
  }

  // Clear all todos
  const clearTodos=()=>{
    setTodos([]);
    setFilteredTodos([]);
    setIsCleared(true);
    
  }
  
  // Searching todo
  useEffect(()=>{
    console.log(searchVal);
    const searchedTodos=todos.filter((todo:ITodo)=>todo.title.toLowerCase().startsWith(searchVal.toLocaleLowerCase()));
    setFilteredTodos(searchedTodos);
    
  },[searchVal])

  // Set item to LocalStorage
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  },[todos])

  return (<IonApp>
      
    <IonToast
            isOpen={add}
            onDidDismiss={() => setAdd(false)}
            message="Items added successfully"
            position="top"
            duration={1500}
            color="success"
    />
    <IonToast
            isOpen={isCleared}
            onDidDismiss={() => setIsCleared(false)}
            message="All Items are deleted successfully"
            position="top"
            duration={1500}
            color="success"
    />
    <IonToast
            isOpen={isEdited}
            onDidDismiss={() => setIsEdited(false)}
            message="Item edited successfully"
            position="top"
            duration={1500}
            color="success"
    />
     <IonToast
            isOpen={isFound}
            onDidDismiss={() => setIsFound(false)}
            message="Title or Description not added"
            position="top"
            duration={1500}
            color="danger"
    />
    <IonToast
            isOpen={isDeleted}
            onDidDismiss={() => setIsDeleted(false)}
            message="Item deleted succesfully"
            position="top"
            duration={1500}
            color="success"
    />
    <Navbar searchVal={searchVal} setSearchval={setSearchVal}/>
    {/* <div>  
      <IonItem>
        <IonLabel position="floating">Task Title</IonLabel>
        <IonInput name="title" value={title} onIonChange={(e:any)=>setTitle(e.target.value)}></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Task Description</IonLabel>
        <IonInput name="desc" value={desc} onIonChange={(e:any)=>setDesc(e.target.value)} ></IonInput>
      </IonItem>
      <div className="ion-text-center ion-margin">
        <IonButton className="ion-text-center" color="primary" onClick={addTodo}>
            Submit
            <IonIcon slot="end" icon={send}></IonIcon>
        </IonButton>
      </div>
    </div> */}
    <IonContent>
    <SearchForm title={title} desc={desc} isEditing={isEditing} setTitle={setTitle} setDesc={setDesc} addTodo={addTodo} />
    <Todos tasks={filteredTodos} removeTask={removeTask} editTask={editTask} clearTodos={clearTodos}/>
    </IonContent> 
  </IonApp>
  )
};

export default App;
