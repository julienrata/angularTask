# Task Manager Styleguide

Ce styleguide définit les standards de design et les composants réutilisables pour l'application Task Manager.

## Table des matières

1. [Installation et configuration](#installation-et-configuration)
2. [Système de couleurs](#système-de-couleurs)
3. [Typographie](#typographie)
4. [Composants UI](#composants-ui)
   - [Buttons](#buttons)
   - [Cards](#cards)
   - [Badges](#badges)
   - [Form Fields](#form-fields)
   - [Task Status Badges](#task-status-badges)
5. [Utilitaires](#utilitaires)
   - [Espacement](#espacement)
   - [Flexbox](#flexbox)
   - [Ombres](#ombres)
   - [Bordures et rayons](#bordures-et-rayons)

## Installation et configuration

Pour utiliser le styleguide, importez les composants nécessaires depuis le module partagé :

```typescript
import { 
  AppButtonComponent, 
  AppCardComponent, 
  AppBadgeComponent, 
  AppFormFieldComponent,
  TaskStatusBadgeComponent
} from '@app/shared/ui-components';

@Component({
  // ...
  imports: [
    AppButtonComponent,
    AppCardComponent,
    AppBadgeComponent,
    AppFormFieldComponent,
    TaskStatusBadgeComponent
  ]
})
```

## Système de couleurs

Notre palette de couleurs primaires:

- Primary: #3f51b5 (Indigo)
- Secondary: #ff4081 (Pink)
- Success: #4caf50 (Green)
- Info: #2196f3 (Blue)
- Warning: #ff9800 (Orange)
- Danger: #f44336 (Red)
- Light: #f5f5f5 (Light Grey)
- Dark: #212121 (Dark Grey)

Pour utiliser ces couleurs, vous pouvez employer les classes utilitaires:

```html
<div class="text-primary">Texte en couleur primaire</div>
<div class="bg-success">Arrière-plan en couleur de succès</div>
```

## Typographie

- Font family: 'Roboto', sans-serif
- Tailles de base:
  - Base: 1rem (16px)
  - H1: 2.5rem
  - H2: 2rem
  - H3: 1.75rem
  - Small: 0.875rem

Pour une mise en forme cohérente, utilisez les styles prédéfinis:

```scss
@include heading-1;
@include heading-2;
@include heading-3;
@include body-text;
@include small-text;
```

## Composants UI

### Buttons

```html
<!-- Variantes de base -->
<app-button>Bouton par défaut</app-button>
<app-button variant="secondary">Bouton secondaire</app-button>
<app-button variant="success">Bouton succès</app-button>

<!-- Tailles -->
<app-button size="sm">Petit</app-button>
<app-button>Moyen (par défaut)</app-button>
<app-button size="lg">Grand</app-button>

<!-- États -->
<app-button disabled="true">Désactivé</app-button>
<app-button loading="true">Chargement</app-button>

<!-- Avec icônes -->
<app-button iconLeft="plus">Ajouter</app-button>
<app-button iconRight="arrow-right">Suivant</app-button>

<!-- Pleine largeur -->
<app-button [fullWidth]="true">Pleine largeur</app-button>
```

### Cards

```html
<!-- Carte basique -->
<app-card title="Titre de la carte" subtitle="Sous-titre optionnel">
  <div cardBody>
    Contenu de la carte
  </div>
</app-card>

<!-- Variantes de carte -->
<app-card variant="primary" title="Carte primaire">
  <div cardBody>Contenu</div>
</app-card>

<!-- Avec élévation -->
<app-card [elevation]="'lg'" title="Carte avec ombre">
  <div cardBody>Contenu</div>
</app-card>

<!-- Avec effet au survol -->
<app-card [hover]="true" title="Carte interactive">
  <div cardBody>Survolez-moi</div>
</app-card>

<!-- Avec pied de page -->
<app-card title="Carte avec pied de page" footerClass="text-end">
  <div cardBody>Contenu</div>
  <div cardFooter>
    <app-button variant="primary" size="sm">Action</app-button>
  </div>
</app-card>
```

### Badges

```html
<!-- Variantes de base -->
<app-badge variant="primary">Primary</app-badge>
<app-badge variant="success">Success</app-badge>

<!-- Badge en forme de pilule -->
<app-badge variant="primary" [pill]="true">Pilule</app-badge>

<!-- Badge avec contour -->
<app-badge variant="primary" [outline]="true">Contour</app-badge>
```

### Form Fields

```html
<!-- Champ basique -->
<app-form-field label="Nom">
  <input type="text" class="form-control">
</app-form-field>

<!-- Champ requis -->
<app-form-field label="Email" [required]="true">
  <input type="email" class="form-control">
</app-form-field>

<!-- Avec indice -->
<app-form-field label="Mot de passe" hint="Minimum 8 caractères">
  <input type="password" class="form-control">
</app-form-field>

<!-- Avec message d'erreur -->
<app-form-field label="Email" error="Email invalide">
  <input type="email" class="form-control is-invalid">
</app-form-field>

<!-- Avec select -->
<app-form-field label="Catégorie">
  <select class="form-select">
    <option value="">Sélectionner...</option>
    <option value="1">Option 1</option>
  </select>
</app-form-field>
```

### Task Status Badges

```html
<app-task-status-badge status="completed"></app-task-status-badge>
<app-task-status-badge status="in-progress"></app-task-status-badge>
<app-task-status-badge status="pending"></app-task-status-badge>
```

## Utilitaires

### Espacement

Utilisez les classes d'espacement pour les marges et paddings:

```html
<!-- Marges -->
<div class="mt-3">Marge supérieure de 1rem</div>
<div class="me-2">Marge droite de 0.5rem</div>
<div class="mb-4">Marge inférieure de 1.5rem</div>
<div class="ms-1">Marge gauche de 0.25rem</div>
<div class="mx-auto">Marges horizontales auto</div>
<div class="my-2">Marges verticales de 0.5rem</div>

<!-- Paddings -->
<div class="p-3">Padding de 1rem tout autour</div>
<div class="px-2">Padding horizontal de 0.5rem</div>
<div class="py-3">Padding vertical de 1rem</div>
```

### Flexbox

```html
<div class="d-flex">Display flex</div>
<div class="d-flex flex-column">Colonnes flex</div>
<div class="d-flex justify-content-between">Espacement entre les éléments</div>
<div class="d-flex align-items-center">Centré verticalement</div>
```

### Ombres

```html
<div class="shadow-sm">Petite ombre</div>
<div class="shadow">Ombre moyenne</div>
<div class="shadow-lg">Grande ombre</div>
```

### Bordures et rayons

```html
<div class="border">Bordure sur tous les côtés</div>
<div class="border-top">Bordure supérieure</div>
<div class="rounded">Coins arrondis</div>
<div class="rounded-circle">Forme circulaire</div>
```