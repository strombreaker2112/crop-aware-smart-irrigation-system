#pragma once

// Paste the PEM-encoded ROOT CA certificate that validates your HiveMQ Cloud
// broker certificate chain. Include the BEGIN/END CERTIFICATE lines.
// Obtain it from the broker's verified certificate chain for your cluster.
// Do not use the broker's leaf/server certificate as the long-term trust anchor.
//
// Until a valid root CA is installed, MQTT TLS connection will fail closed.
static const char MQTT_ROOT_CA[] = "";
