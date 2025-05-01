// swift-tools-version:5.9
import PackageDescription

let package = Package(
  name: "TreeListPreview",
  platforms: [
    .iOS(.v17)
  ],
  products: [
    .library(name: "TreeListPreview", targets: ["TreeList"])
  ],
  targets: [
    .target(
      name: "TreeList",
      path: ".",
      sources: ["TreeList.swift"]
    )
  ]
)
