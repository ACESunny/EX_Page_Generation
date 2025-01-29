import 'package:flutter/material.dart';
import 'package:http/http.dart' as http; // http requests
import 'dart:convert'; // convert json

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Test API Page Generation',
        home: Scaffold(
          appBar: AppBar(title: Text('Test API Page Generation')),
          body: Center(
            child: ElevatedButton(
              onPressed: () {
                sendData();
              },
              child: Text('Send Data to API'),
            ),
          ),
        ));
  }
}

// Function to send data to API
Future<void> sendData() async {
  // API URL
  final url = Uri.parse('http://10.0.2.2:7000/api/data');

  final response = await http.post(
    url,
    headers: {'Content-Type': 'application/json'},
    body: json.encode({
      'uid': '123456',
      'display_name': 'Sunflower',
      'product_name': 'Apple'
    }),
  );

  if (response.statusCode == 201) {
    print('Data sent successfully');
  } else {
    print('Failed to send data');
  }
}
