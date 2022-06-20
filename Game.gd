extends Node

var ws = WebSocketClient.new()
var URL = "ws://localhost:3000/"

func _ready():
	ws.connect("connection_closed", self, "_closed")
	ws.connect("connection_error", self, "_closed")
	ws.connect("connection_established", self, "_connected")
	ws.connect("data_received", self, "_on_data")
	
	var err = ws.connect_to_url(URL)
	if err != OK:
		print("Client: Connection Refused")
		set_process(false)
		
func _closed(was_clean = false):
	print("Client: Connection Closed")

func _connected(proto = ""):
	print("Client: Connected To Server")
	ws.get_peer(1).put_packet("Message from client".to_utf8())
	ws.poll()
	
func _on_data():
	var response = ws.get_peer(1).get_packet().get_string_from_utf8()
	print("Server: " + str(response))
	
func _process(delta):
	# Call this in _process or _physics_process. Data transfer, and signals
	# emission will only happen when calling this function.
	ws.poll()
