<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

$host = "127.0.0.1";
$dbname = "projet";
$username = "root";
$password = "";

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $conn = new mysqli($host, $username, $password, $dbname);
    $conn->set_charset("utf8mb4");
} catch (mysqli_sql_exception $e) {
    echo json_encode(["success" => false, "message" => "Erreur de connexion à la base de données", "error" => $e->getMessage()]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["prenom"], $data["nom"], $data["email"], $data["password"], $data["jour"], $data["mois"], $data["annee"], $data["sexe"])) {
    echo json_encode(["success" => false, "message" => "Données incomplètes"]);
    exit();
}

$prenom = $conn->real_escape_string($data["prenom"]);
$nom = $conn->real_escape_string($data["nom"]);
$email = $conn->real_escape_string($data["email"]);
$password = password_hash($data["password"], PASSWORD_BCRYPT);
$jour = $conn->real_escape_string($data["jour"]);
$mois = $conn->real_escape_string($data["mois"]);
$annee = $conn->real_escape_string($data["annee"]);
$sexe = $conn->real_escape_string($data["sexe"]);

$sql = "INSERT INTO users (prenom, nom, email, password, sexe, jour, mois, annee) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssssss", $prenom, $nom, $email, $password, $sexe, $jour, $mois, $annee);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Inscription réussie"]);
} else {
    echo json_encode(["success" => false, "message" => "Erreur lors de l'inscriptionnnnn"]);
}

$stmt->close();
$conn->close();
?>
