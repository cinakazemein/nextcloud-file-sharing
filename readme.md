nextcloud version:
master branch in 2022 22 April
https://github.com/nextcloud/server
sudo -u www-data php occ --version

  `Nextcloud 25.0.0 dev`
  
  guidance:
  
  sudo -u www-data php occ migrations:migrate files_sharing (in root of project)
  npm run watch (in root of project)
  
  feature :
  
  this feature is about a user can share a folder but them can get the permission from another user for open the folder (just show).
 
![Screenshot from 2022-04-22 16-32-43](https://user-images.githubusercontent.com/68768066/164710774-fd1200e6-4b14-4f88-9b3d-ba4f95a7f0f7.png)
