import { IonCard, IonCardContent, IonItem, IonLabel,IonTitle,IonIcon,IonButton, } from '@ionic/react';
import React from 'react'
import todos from "../utils/tasks"
import { trash,create } from 'ionicons/icons';
import {ITodo} from "../utils/ITodo"
import { send,trashBin } from 'ionicons/icons';

interface Props{
    tasks:Array<ITodo>;
    removeTask:(id:number)=>void;
    editTask:(id:number)=>void;
    clearTodos:()=>void;
}
const Todos:React.FC <Props>= ({tasks,removeTask,editTask,clearTodos}) => {
    return (
        <div className="section-center">
            {/* <IonCard className="todo-card"> */}
            {
                tasks.map((todo,index)=>{
                    return (
                        <IonItem key={index} className="card-item">
                            <IonLabel>{todo.title}</IonLabel>
                            <IonCardContent>{todo.desc}</IonCardContent>
                            <div className="icons">
                                <IonIcon className="edit-icon" icon={create} color="success" onClick={()=>editTask(todo.id)}/>
                                <IonIcon className="delete-icon" icon={trash} color="danger" onClick={()=>removeTask(todo.id)}/>
                            </div>
                        </IonItem>
                    )
                })
            }
            {/* </IonCard> */}
            <div className="ion-text-center">
                    <IonButton className="ion-text-center ion-margin-bottom btn" color="danger" onClick={clearTodos}>
                        <span>Clear</span>
                    <IonIcon slot="end" icon={trashBin}></IonIcon>
                    </IonButton>
            </div>
        </div>
    )
}

export default Todos

{/* <IonCard>
          <IonItem>
            <IonIcon icon={pin} slot="start" />
            <IonLabel>ion-item in a card, icon left, button right</IonLabel>
            <IonButton fill="outline" slot="end">View</IonButton>
          </IonItem>

          <IonCardContent>
            This is content, without any paragraph or header tags,
            within an ion-cardContent element.
      </IonCardContent>
        </IonCard> */}
