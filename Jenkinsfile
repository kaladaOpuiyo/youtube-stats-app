pipeline {
  agent {
    dockerfile true
  }

    options {
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }

    triggers {
        pollSCM('*/1 * * * *')
    }

    stages {
    
        stage('Test') {
          
            steps {
                sh 'ls -a'
                sh 'npm -v'
                sh 'node -v'
                sh 'printenv'
           }
        }
       
    }

 }