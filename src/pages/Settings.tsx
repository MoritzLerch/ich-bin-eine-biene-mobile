import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import packagejs from "../../package.json";
const PageSettings: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Einstellungen</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItemDivider>Info</IonItemDivider>
        <IonItem>
          <IonLabel>Entwickler</IonLabel>
          Mark Oude Elberink
        </IonItem>
        <IonItem>
          <IonLabel>Version</IonLabel>
          {packagejs.version}
        </IonItem>
        <IonItem>
          <IonLabel>Kontakt</IonLabel>
          <IonButton slot="end" href="mailto:mark@oude-elberink.de">
            E-Mail
          </IonButton>
        </IonItem>
        <IonItem>
          <IonLabel>Website</IonLabel>
          <IonButton href="https://toastbrot.org/">Web</IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default PageSettings;