pipeline {
    agent any

    environment {
        DEV_SERVER_IP = '13.234.119.246'
        LIVE_SERVER_IP = '65.2.178.1'
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    // Capture the branch name provided by Jenkins
                    def branchName = env.BRANCH_NAME ?: 'main'
                    echo "Branch name: ${branchName}"
                    // Check out the code from the repository
                    checkout([$class: 'GitSCM', branches: [[name: "${branchName}"]],
                              userRemoteConfigs: [[url: 'https://github.com/geethadineshs/nodejs.git']]])
                }
            }
        }

        stage('Deploy to Dev') {
            when {
                branch 'dev'
            }
            steps {
                script {
                    // Use Jenkins SSH credentials for Dev server deployment
                    sshagent(['devserver-ssh']) {
                        sh '''
                        ssh -o StrictHostKeyChecking=no ubuntu@${DEV_SERVER_IP} '
                        cd /home/ubuntu/nodejs || exit
                        if [ ! -d .git ]; then
                            git init
                            git remote add origin https://github.com/geethadineshs/nodejs.git
                        fi
                        git pull origin dev || exit
                        if ! command -v npm &> /dev/null; then
                            curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
                            sudo apt-get install -y nodejs
                        fi
                        npm install || exit
                        pm2 restart node || pm2 start app.js --name node
                        # Create filedev.txt to indicate successful deployment
                        echo "Deployment to dev server successful" > /home/ubuntu/filedev.txt'
                        '''
                    }
                }
            }
        }

        stage('Deploy to Live') {
            when {
                branch 'main'
            }
            steps {
                script {
                    // Use Jenkins SSH credentials for Live server deployment
                    sshagent(['liveserver-ssh']) {
                        sh '''
                        ssh -o StrictHostKeyChecking=no ubuntu@${LIVE_SERVER_IP} '
                        cd /home/ubuntu/nodejs || exit
                        if [ ! -d .git ]; then
                            git init
                            git remote add origin https://github.com/geethadineshs/nodejs.git
                        fi
                        git pull origin main || exit
                        if ! command -v npm &> /dev/null; then
                            curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
                            sudo apt-get install -y nodejs
                        fi
                        npm install || exit
                        pm2 restart node || pm2 start app.js --name node
                        # Create filelive.txt to indicate successful deployment
                        echo "Deployment to live server successful" > /home/ubuntu/filelive.txt'
                        '''
                    }
                }
            }
        }
    }
}
