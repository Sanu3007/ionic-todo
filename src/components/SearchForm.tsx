import React from 'react'
import {IonLabel,IonItem,IonInput,IonButton,IonIcon} from '@ionic/react';
import { send } from 'ionicons/icons';
interface Props{
    title:string;
    desc:string;
    isEditing:boolean;
    setTitle:(title:string)=>void
    setDesc:(desc:string)=>void;
    addTodo:()=>void;
}

const SearchForm:React.FC<Props> = ({title,desc,setTitle,setDesc,addTodo,isEditing}) => {
    return (
        <div className="section-center">
            <div className="form-center">
                <IonItem>
                    <IonLabel position="floating">Task Title</IonLabel>
                    <IonInput name="title" value={title} onIonChange={(e:any)=>setTitle(e.target!.value)}></IonInput>
                    </IonItem>
                <IonItem>
                    <IonLabel position="floating">Task Description</IonLabel>
                    <IonInput name="desc" value={desc} onIonChange={(e:any)=>setDesc(e.target.value)} ></IonInput>
                </IonItem>
                <div className="ion-text-center ion-margin">
                    {isEditing?<IonButton className="ion-text-center btn" color="primary" onClick={addTodo}>
                        <span>Edit</span>
                    <IonIcon slot="end" icon={send}></IonIcon>
                    </IonButton>:
                    <IonButton className="ion-text-center btn" color="primary" onClick={addTodo}>
                        <span>Submit</span>
                    <IonIcon slot="end" icon={send}></IonIcon>
                    </IonButton>}
                </div>
            </div>
        </div>
    )
}

export default SearchForm
