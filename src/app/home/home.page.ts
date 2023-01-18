import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LocalNotifications } from '@capacitor/local-notifications';
import { title } from 'process';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private alertController: AlertController) {}

  async ngOnInit(): Promise<void> {
    await LocalNotifications.requestPermissions();
    LocalNotifications.registerActionTypes({
      types:[
        {
        id: 'NOTIFICATION_OPTIONS',
        actions: [
          {
            id: 'view',
            title: 'Open'
          },
          {
            id: 'remove',
            title: 'Dismiss',
            destructive: true
          },
          {
            id: 'respond',
            title: 'Respond',
            input: true
          }
        ]}
      ]
    });
  }

  async scheduleBasic() {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Friendly Reminder',
          body: 'Testing Out Local Notifications',
          id: 1,
          extra: {
            data: 'Pass the data back to the handler'
          },
          iconColor: '#0000FF'
        }
        
      ]
    });
  }

  async scheduleAdvanced() {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Friendly Reminder With Actions',
          body: 'Local Notifications With Actions - they are not showing',
          id: 2,
          extra: {
            data: 'Pass the data back to the handler'
          },
          iconColor: '#0000FF',
          actionTypeId: 'NOTIFICATION_OPTIONS',
          schedule: { at: new Date(Date.now() + 1000 * 3) }
        }
        
      ]
    });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
