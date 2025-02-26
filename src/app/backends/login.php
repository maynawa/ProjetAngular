<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

// Connexion à la base de données
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

if (!isset($data["email"], $data["password"])) {
    echo json_encode(["success" => false, "message" => "Email et mot de passe requis"]);
    exit();
}

$email = $conn->real_escape_string($data["email"]);
$password = $data["password"];

$sql = "SELECT id, email, password, prenom, nom, sexe, jour, mois, annee FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user["password"])) {
        echo json_encode([
            "success" => true,
            "message" => "Connexion réussie",
            "user" => [
                "id" => $user["id"],
                "email" => $user["email"],
                "prenom" => $user["prenom"],
                "nom" => $user["nom"],
                "sexe" => $user["sexe"],
                "jour" => $user["jour"],
                "mois" => $user["mois"],
                "annee" => $user["annee"],
            ]
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Mot de passe incorrect"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Utilisateur non trouvé"]);
}

$stmt->close();
$conn->close();
?>
