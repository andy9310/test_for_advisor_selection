def remote = [:]
remote.name = 'newCCVMCP'
remote.host = '192.168.100.200'
remote.user = 'jenkins'
remote.allowAnyHosts = true


pipeline {
    environment {
        PROJECT_DIR="/var/www/comm/advisor-selection"
    }
    agent any

    stages {
        stage('Pulling from Git') {
            steps {
                script {
                    withCredentials([file(credentialsId: 'DEV_VM_PRIVATE_KEY', variable: 'PRIVATE_KEY')]) {
                        remote.identityFile = PRIVATE_KEY
                        sshCommand remote: remote, command: """
                            cd ${PROJECT_DIR};
                            git fetch;
                            git checkout -f ${GIT_COMMIT};
                        """
                    }
                }
            }
        }

        stage('Installing Dependencies') {
            steps {
                script {
                    withCredentials([file(credentialsId: 'DEV_VM_PRIVATE_KEY', variable: 'PRIVATE_KEY')]) {
                        remote.identityFile = PRIVATE_KEY
                        sshCommand remote: remote, command: """
                            cd ${PROJECT_DIR};
                            npm install;
                        """
                    }
                }
            }
        }

        stage('Deploying') {
            steps {
                script {
                    withCredentials([file(credentialsId: 'DEV_VM_PRIVATE_KEY', variable: 'PRIVATE_KEY')]) {
                        remote.identityFile = PRIVATE_KEY
                        sshCommand remote: remote, command: """
                            cd ${PROJECT_DIR};
                            npm run build;
                        """
                    }
                }
            }
        }

        stage('Notifying Gitlab') {
          steps {
             echo 'Notify GitLab'
             updateGitlabCommitStatus name: 'build', state: 'pending'
             updateGitlabCommitStatus name: 'build', state: 'success'
          }
       }

        stage('Push notification to Mattermost') {
            steps {
                sh """
                    curl -i -X POST -H 'Content-Type: application/json' -d '{
                        "text": "Successfully deployed advisor-selection-frontend"
                    }' ${MATTERMOST_WEBHOOK};
                """
            }
        }
    }
}
