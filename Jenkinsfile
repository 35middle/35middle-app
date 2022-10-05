pipeline {
    agent {
        docker {
            image 'node:16.16'
            args '-u 0:0'
        }
    }
    // agent any

    environment {
        ENVIRONMENT = 'UAT'
        // change
        // BUCKET_NAME = 's3://uat-learn.jiangren.com.au'
        BUCKET_NAME = '35middlefront'

        // WORKSPACE_PATH = '/var/jenkins_home/workspace/jr-dashboard-uat/dist'
        WORKSPACE_PATH = '/var/lib/jenkins/workspace/good/out'

    }

    stages {
        stage('Hello') {
            steps {
                echo 'Hello World'
            }
        }
//         stage('Git checkout') {
//             steps{
//                 // Get source code from a GitHub repository
//                 // git branch:'develop', url:'https://github.com/35middle/35middle-app.git'
                
//                 git branch:'main', url:'https://github.com/thomasni91/35middle-app'
//             }
//         }
        stage('yarn install') {
            steps{
                // dir("./") {
                    sh 'node -v'
                    sh 'npm -v'
//                     sh 'npm install'
//                     sh 'echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list'
                    sh 'apt update'
                    sh 'apt install yarn -y'
                    // sh 'curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -'
                    // sh 'sudo apt-get install -y nodejs'
                    // sh 'sudo npm install -g yarn@1.22.17'
                    sh 'yarn --version'
                // }
            }
        }
        stage('npm build') {
            steps{
                // dir("./") {
                    sh 'yarn run build'
//                     sh 'yarn export'
//                     sh 'npm run build'
//                     sh 'npm run export'
                    echo 'bye'
                // }
            }
        }
        stage('install aws cli') {
            steps {
                echo " install aws cli"
                sh 'apt-get update'
                sh 'apt install python3-pip -y'
                sh 'pip3 install awscli --upgrade'
            }
        }
        stage('deploy') {
            when {
                expression {
                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                }
            }
            steps{
                // dir("./") {
                deployToS3(ENVIRONMENT)
                // }
            }
        }
    }
}


def deployToS3(environment) {
    echo 'deploy to ' + environment + '...'
    // withAWS(credentials: 'c4b84a7a-ce3s-3fad-b3j2-0033a3jj322', region: 'ap-southeast-2') {
    withAWS(credentials: 'AWS_Shengni', region: 'ap-southeast-2') {
        echo "${BUCKET_NAME}"
        sh 'aws --version'
        sh 'aws sts get-caller-identity'
        sh 'aws s3 ls "${BUCKET_NAME}"'
        sh 'aws s3 rm s3://"${BUCKET_NAME}" --recursive'
        // sh 'aws s3 cp "${WORKSPACE_PATH}" "${BUCKET_NAME}"'
        sh 'aws s3 cp "${WORKSPACE_PATH}" s3://"${BUCKET_NAME}" --recursive'
    }
}
