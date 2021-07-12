import React from 'react';
import{IonHeader,IonToolbar,IonTitle,IonSearchbar,IonGrid,IonCol,IonRow} from '@ionic/react'
import "../index.css"

interface Props{
  searchVal:string;
  setSearchval:(val:string)=>void;
}

const Navbar:React.FC<Props> = ({searchVal,setSearchval}) => {
    return (
        <IonHeader>
            <IonToolbar color="tertiary">
              <IonGrid>
                <IonRow className="ion-align-items-center">
                  <IonCol size="9">
                    <IonTitle className="ion-text-left logo">Task Traker</IonTitle>
                  </IonCol>
                  <IonCol size="3" className="ion-align-self-end">
                      <IonSearchbar value={searchVal} onIonChange={e => setSearchval(e.detail.value!)}></IonSearchbar>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonToolbar>
      </IonHeader> 
    )
}

export default Navbar
