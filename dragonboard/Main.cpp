#include <iostream>
#include <unistd.h>
#include <string>
#include "GpioProcessor.h"
#include "UdpServer.h"

using namespace std;

int main() {
  cout << "Starting programming...." << endl;

  int status = 0;
  int count = 0;
  char* value;
  UdpServer m_server;
  char* message_buffer;
  std::string TEMP = "38.110.22.222";
  
  status = m_server.connectSocket(TEMP.c_str(), 6419);
  if (status != 0) {
    printf("Failed to connect to socket server");
    exit(1);
  } else {
    printf("Connected!");
  }

  GpioProcessor *gpioProcessor = new GpioProcessor();

  Gpio *pin27 = gpioProcessor->getPin27();
  Gpio *pin29 = gpioProcessor->getPin29();

  pin27->in();
  pin29->out();

  while(count < 20) {

    count++;

    value = pin27->getValue();
    cout << "Pin value: " << value << endl;

    if (*value == '0') {
      pin29->low();
     
    } else {
      pin29->high();
    }
    cout << "print message" << endl;
    sprintf(message_buffer, "%d-%s", 0, value);

    m_server.send(&message_buffer, strlen(message_buffer));

    free(value);
    fflush(stdout);
    usleep(100000);

  }

  gpioProcessor->cleanPins();
  delete (gpioProcessor);
  delete (pin29);

  return 0;
}
