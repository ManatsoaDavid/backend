//def COLOR_MAP = [
       //     'SUCCESS': 'good',
          //  'FAILURE': 'danger'
      //  ]

pipeline {
    agent any
 
  //  environment {
   //     registry = "manatsoadavid/back" // Nom de l'image Docker
     //   registryCredential = 'dockerhub' // ID des credentials Docker Hub dans Jenkins
       
 //   }

    tools {
        nodejs 'nodejs20'
    }

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        // stage('Test') {
        //     steps {
        //         sh 'npm run test' // Assurez-vous que les tests sont définis dans le fichier package.json
        //     }
        // }j

   //     stage('Code Analysis with SonarQube') {
   //         environment {
    //            scannerHome = tool 'sonar6'
      //      }
     //       steps {
     //           withSonarQubeEnv('sonarqube-server') { // Nom du serveur configuré dans Jenkins
      //              sh "${scannerHome}/bin/sonar-scanner"
       //         }
        //    }
     //   }

      //  stage("Quality Gate"){
      //      steps {
      //          script {
       //         timeout(time: 1, unit: 'HOURS') {
        //        def qg = waitForQualityGate()
        //        if (qg.status != 'OK') {
         //         error "Pipeline aborted due to quality gate failure: ${qg.status}"
          //      }
           //     }
           //     }
           // }
       // }

        // stage('Push Docker Image') {
         //    steps {
             //    script {
              //       def dockerImage = docker.build("${registry}:version${BUILD_NUMBER}")
              //       docker.withRegistry('', registryCredential) {
               //          dockerImage.push("version${BUILD_NUMBER}")
              //       }
             //    }
           //  }
       //  }

     //    stage('Remove Local Docker Image') {
       //      steps {
       //          sh "docker rmi ${registry}:version${BUILD_NUMBER}"
       //      }
       //  }

     //    stage('Deploy') {
      //       agent { label 'kubernetes' }
       //      steps {
         //           sh "helm upgrade --install --force mychart /home/ramihone/back/backendchart --set appimageback=${registry}:version${BUILD_NUMBER}"
         //    }
       //  }
    } // <- Fermeture correcte du bloc stages

    post {
        always {
            cleanWs() // Nettoie le workspace Jenkins
         //    echo 'Slack Notifications'
          //   script {
              //   slackSend(
            //        tokenCredentialId: 'slacktoken' ,
               //     channel: '#devops-project',
              //      color: COLOR_MAP[currentBuild.currentResult],
              //      message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"
                        
               // )
            // }
        }
    }
}
