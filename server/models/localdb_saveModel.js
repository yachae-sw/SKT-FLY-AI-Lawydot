const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// MongoDB 연결 URI 및 데이터베이스 설정
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const databaseName = 'legal_database';
const collectionName = 'laws';

// JSON 파일이 위치한 디렉토리
const jsonFilesDirectory = 'C://dev//project//Crawling//Dataset//civil_affairs//law_no//0';

async function uploadAllJsonToMongoDB() {
  try {
    await client.connect();
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);

    // 디렉토리에서 모든 JSON 파일 목록 읽기
    const jsonFiles = fs.readdirSync(jsonFilesDirectory).filter((file) => file.endsWith('.json'));

    // 각 JSON 파일에 대해 반복
    for (const jsonFile of jsonFiles) {
      const filePath = path.join(jsonFilesDirectory, jsonFile);
      const fileContent = fs.readFileSync(filePath);
      const document = JSON.parse(fileContent);

      // MongoDB에 문서 추가
      const result = await collection.insertOne(document);
      console.log(`Document inserted with _id: ${result.insertedId}`);
    }
  } catch (err) {
    console.error(`An error occurred: ${err}`);
  } finally {
    await client.close();
  }
}

// 함수 실행
uploadAllJsonToMongoDB();
