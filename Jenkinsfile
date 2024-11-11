pipeline {
    agent any

    environment {
        //registry = "manatsoadavid/back" // Nom de l'image Docker
        //registryCredential = 'dockerhub' // ID des credentials Docker Hub dans Jenkins
        scannerHome = tool 'sonar4.7' // Configurez le scanner SonarQube dans Jenkins
        COLOR_MAP = [
            'SUCCESS': 'good',
            'FAILURE': 'danger'
        ]
    }

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

        stage('Test') {
            steps {
                sh 'npm run test' // Assurez-vous que les tests sont définis dans le fichier package.json
            }
        }

        stage('Code Analysis with SonarQube') {
            steps {
                withSonarQubeEnv('sonar') { // Assurez-vous que 'sonar' est configuré dans Jenkins
                    sh '''${scannerHome}/bin/sonar-scanner \
                    -Dsonar.projectKey=natik-back-key \
                    -Dsonar.projectName=natik-back \
                    -Dsonar.language=ts \
                    -Dsonar.sources=. \
                    -Dsonar.exclusions=node_modules/**,dist/** \
                    -Dsonar.tests=src \
                    -Dsonar.test.inclusions=**/*.test.ts'''
                }
            }
        }

        //stage('Push Docker Image') {
         //   steps {
             //   script {
               //     def dockerImage = docker.build("${registry}:version${BUILD_NUMBER}")
               //     docker.withRegistry('', registryCredential) {
                 //       dockerImage.push("version${BUILD_NUMBER}")
                 //   }
                //}
            //}
        //}

        //stage('Remove Local Docker Image') {
            //steps {
                //sh "docker rmi ${registry}:version${BUILD_NUMBER}"
            //}
        //}

        //stage('Deploy') {
            //agent { label 'kubernetes' }
            //steps {
              //  sh "helm upgrade --install --force mychart /home/ramihone/back/backendchart --set appimageback=${registry}:version${BUILD_NUMBER}"
            //}
       // }
    }

    post {
        always {
            cleanWs() // Nettoie le workspace Jenkins
            echo 'Slack Notifications'
            script {
                slackSend(
                    channel: '#devops-project',
                    color: COLOR_MAP[currentBuild.currentResult],
                    message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"
                )
            }
        }
    }
}
