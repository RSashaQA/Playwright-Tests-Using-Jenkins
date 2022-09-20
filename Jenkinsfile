pipeline {
agent any
  stages {
    stage('install playwright') {
      steps {
        sh '''
          npm i -D @playwright/test
          npm install fs-extra
          npx playwright install
        '''
      }
    }
    stage('test') {
      steps {
        sh '''
          npx playwright test --list
          npx playwright test categories.spec.js --workers 1 --project=chromium
        '''
      }
    }
stage('reports') {
    steps {
    script {
            allure([
                    includeProperties: false,
                    jdk: '',
                    properties: [],
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: 'target/playwright-report']]
            ])
            
        }
        script {
          publishHTML (target : [allowMissing: false,
 alwaysLinkToLastBuild: true,
 keepAll: true,
 reportDir: 'reports',
 reportFiles: 'myreport.html',
 reportName: 'My Reports',
 reportTitles: 'The Report'])
        }
      }
    }
  }
}