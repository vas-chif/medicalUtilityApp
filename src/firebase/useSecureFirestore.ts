/**
 * @file useSecureFirestore.ts
 * @description Wrapper sicuro per operazioni Firestore con monitoring automatico
 * @author ProfessioneSiCura Development Team
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  writeBatch,
  type QuerySnapshot,
  type DocumentSnapshot,
  type FirestoreError,
  type DocumentData,
  type DocumentReference,
  type CollectionReference,
  type Query,
  type WhereFilterOp,
  type SetOptions,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseInit';
import { useSecureLogger } from '../composables/useSecureLogger';

/**
 * Composable che wrappa le operazioni Firestore con monitoring automatico
 * e controllo dei limiti per evitare costi imprevisti
 */
export function useSecureFirestore() {
  // Usa il database configurato invece di getFirestore()
  const { logger } = useSecureLogger();

  // Monitoring semplificato - in futuro useFirestoreMonitoring fornirà metriche complete
  // Nota per junior: underscore (_) prima del nome indica parametro intenzionalmente non usato
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const checkOperationPermission = (_operationType: 'read' | 'write' | 'delete'): boolean => {
    // Per ora sempre consentito - in futuro controllerà quote e limiti
    return true;
  };

  /**
   * Lettura sicura di un singolo documento
   */
  async function secureGetDoc(
    docRef: DocumentReference<DocumentData>,
  ): Promise<DocumentSnapshot<DocumentData> | null> {
    try {
      const canProceed = checkOperationPermission('read'); // Rimuovo await perché ora è sincrona
      if (!canProceed) return null;

      const snapshot = await getDoc(docRef);
      // TODO: reintrodurre monitoring quando useFirestoreMonitoring sarà disponibile

      logger.debug('📖 Firestore document read', {
        path: docRef.path,
        exists: snapshot.exists(),
      });

      return snapshot; // Rimuovo casting inutile
    } catch (error) {
      logger.error('❌ Firestore getDoc failed', {
        path: docRef.path,
        error: (error as FirestoreError).message,
      });
      throw error;
    }
  }

  /**
   * Lettura sicura di una collection/query
   * @param queryRef - Query o CollectionReference da Firestore
   * Spiegazione: Query<DocumentData> è il tipo specifico per le query Firestore
   */
  async function secureGetDocs(
    queryRef: Query<DocumentData> | CollectionReference<DocumentData>,
  ): Promise<QuerySnapshot<DocumentData> | null> {
    try {
      const canProceed = checkOperationPermission('read'); // Rimuovo await
      if (!canProceed) return null;

      const snapshot = await getDocs(queryRef);

      logger.debug('📚 Firestore query executed', {
        docsReturned: snapshot.docs.length,
        empty: snapshot.empty,
      });

      return snapshot; // Rimuovo casting inutile
    } catch (error) {
      logger.error('❌ Firestore getDocs failed', {
        error: (error as FirestoreError).message,
      });
      throw error;
    }
  }

  /**
   * Scrittura sicura di un documento
   * @param docRef - Riferimento al documento Firestore
   * @param data - Dati da scrivere (oggetto JavaScript generico)
   * @param options - Opzioni come {merge: true} per unire invece di sovrascrivere
   */
  async function secureSetDoc(
    docRef: DocumentReference<DocumentData>,
    data: DocumentData,
    options?: SetOptions,
  ): Promise<boolean> {
    try {
      const canProceed = checkOperationPermission('write');
      if (!canProceed) return false;

      // SetOptions può essere undefined, quindi usiamo conditional
      if (options) {
        await setDoc(docRef, data, options);
      } else {
        await setDoc(docRef, data);
      }

      logger.debug('✏️ Firestore document written', {
        path: docRef.path,
        hasOptions: !!options,
      });

      return true;
    } catch (error) {
      logger.error('❌ Firestore setDoc failed', {
        path: docRef.path,
        error: (error as FirestoreError).message,
      });
      throw error;
    }
  }

  /**
   * Aggiornamento sicuro di un documento
   * @param docRef - Riferimento al documento
   * @param data - Campi da aggiornare (solo i campi specificati vengono modificati)
   */
  async function secureUpdateDoc(
    docRef: DocumentReference<DocumentData>,
    data: DocumentData,
  ): Promise<boolean> {
    try {
      const canProceed = checkOperationPermission('write');
      if (!canProceed) return false;

      await updateDoc(docRef, data);

      logger.debug('📝 Firestore document updated', {
        path: docRef.path,
        fields: Object.keys(data),
      });

      return true;
    } catch (error) {
      logger.error('❌ Firestore updateDoc failed', {
        path: docRef.path,
        error: (error as FirestoreError).message,
      });
      throw error;
    }
  }

  /**
   * Aggiunta sicura di un documento
   * @param collectionRef - Riferimento alla collection
   * @param data - Dati del nuovo documento (Firestore genera l'ID automaticamente)
   */
  async function secureAddDoc(
    collectionRef: CollectionReference<DocumentData>,
    data: DocumentData,
  ): Promise<string | null> {
    try {
      const canProceed = checkOperationPermission('write');
      if (!canProceed) return null;

      const docRef = await addDoc(collectionRef, data);

      logger.debug('➕ Firestore document added', {
        collection: collectionRef.path,
        docId: docRef.id,
      });

      return docRef.id;
    } catch (error) {
      logger.error('❌ Firestore addDoc failed', {
        collection: collectionRef.path,
        error: (error as FirestoreError).message,
      });
      throw error;
    }
  }

  /**
   * Cancellazione sicura di un documento
   * @param docRef - Riferimento al documento da eliminare
   */
  async function secureDeleteDoc(docRef: DocumentReference<DocumentData>): Promise<boolean> {
    try {
      const canProceed = checkOperationPermission('delete');
      if (!canProceed) return false;

      await deleteDoc(docRef);

      logger.debug('🗑️ Firestore document deleted', {
        path: docRef.path,
      });

      return true;
    } catch (error) {
      logger.error('❌ Firestore deleteDoc failed', {
        path: docRef.path,
        error: (error as FirestoreError).message,
      });
      throw error;
    }
  }

  /**
   * Query builder sicuro con monitoring
   * Spiegazione: Questo crea un "fluent API" per costruire query in modo leggibile
   */
  function secureQuery(collectionPath: string) {
    const collectionRef = collection(db, collectionPath);

    return {
      /**
       * Aggiunge una condizione where
       * @param operator - WhereFilterOp è il tipo Firebase per ==, !=, <, >, <=, >=, array-contains, in, etc.
       */
      where: (field: string, operator: WhereFilterOp, value: unknown) => {
        const queryRef = query(collectionRef, where(field, operator, value));
        return createQueryChain(queryRef);
      },

      /**
       * Aggiunge ordinamento
       */
      orderBy: (field: string, direction: 'asc' | 'desc' = 'asc') => {
        const queryRef = query(collectionRef, orderBy(field, direction));
        return createQueryChain(queryRef);
      },

      /**
       * Aggiunge limite
       */
      limit: (limitCount: number) => {
        const queryRef = query(collectionRef, limit(limitCount));
        return createQueryChain(queryRef);
      },

      /**
       * Esegue la query
       */
      get: async () => {
        return await secureGetDocs(collectionRef);
      },
    };
  }

  /**
   * Crea una catena di query per il pattern fluent
   * @param queryRef - Query Firestore da estendere
   * Spiegazione: Permette di concatenare where().orderBy().limit().get()
   */
  function createQueryChain(queryRef: Query<DocumentData>) {
    return {
      where: (field: string, operator: WhereFilterOp, value: unknown) => {
        const newQuery = query(queryRef, where(field, operator, value));
        return createQueryChain(newQuery);
      },

      orderBy: (field: string, direction: 'asc' | 'desc' = 'asc') => {
        const newQuery = query(queryRef, orderBy(field, direction));
        return createQueryChain(newQuery);
      },

      limit: (limitCount: number) => {
        const newQuery = query(queryRef, limit(limitCount));
        return createQueryChain(newQuery);
      },

      get: async () => {
        return await secureGetDocs(queryRef);
      },
    };
  }

  /**
   * Batch writer sicuro
   * Spiegazione: WriteBatch permette di fare più operazioni in un'unica transazione atomica
   */
  function secureWriteBatch() {
    // Usiamo writeBatch già importato in cima al file
    const batch = writeBatch(db);
    let operationCount = 0;

    interface SecureBatchBuilder {
      set: (
        docRef: DocumentReference<DocumentData>,
        data: DocumentData,
        options?: SetOptions,
      ) => SecureBatchBuilder;
      update: (docRef: DocumentReference<DocumentData>, data: DocumentData) => SecureBatchBuilder;
      delete: (docRef: DocumentReference<DocumentData>) => SecureBatchBuilder;
      commit: () => Promise<boolean>;
    }

    const batchBuilder: SecureBatchBuilder = {
      /**
       * Aggiunge una operazione di set al batch
       */
      set: (docRef: DocumentReference<DocumentData>, data: DocumentData, options?: SetOptions) => {
        if (options) {
          batch.set(docRef, data, options);
        } else {
          batch.set(docRef, data);
        }
        operationCount++;
        return batchBuilder;
      },

      /**
       * Aggiunge una operazione di update al batch
       */
      update: (docRef: DocumentReference<DocumentData>, data: DocumentData) => {
        batch.update(docRef, data);
        operationCount++;
        return batchBuilder;
      },

      /**
       * Aggiunge una operazione di delete al batch
       */
      delete: (docRef: DocumentReference<DocumentData>) => {
        batch.delete(docRef);
        operationCount++;
        return batchBuilder;
      },

      /**
       * Esegue il batch con monitoring
       */
      commit: async () => {
        try {
          const canProceed = checkOperationPermission('write');
          if (!canProceed) return false;

          await batch.commit();

          logger.debug('📦 Firestore batch committed', {
            operations: operationCount,
          });

          return true;
        } catch (error) {
          logger.error('❌ Firestore batch commit failed', {
            operations: operationCount,
            error: (error as FirestoreError).message,
          });
          throw error;
        }
      },
    };

    return batchBuilder;
  }

  /**
   * Helper per ottenere un reference di documento
   */
  function docRef(collectionPath: string, docId: string) {
    return doc(db, collectionPath, docId);
  }

  /**
   * Helper per ottenere un reference di collection
   */
  function collectionRef(collectionPath: string) {
    return collection(db, collectionPath);
  }

  return {
    // Database reference
    db,

    // Document operations
    docRef,
    collectionRef,

    // Secure CRUD operations
    getDoc: secureGetDoc,
    getDocs: secureGetDocs,
    setDoc: secureSetDoc,
    updateDoc: secureUpdateDoc,
    addDoc: secureAddDoc,
    deleteDoc: secureDeleteDoc,

    // Query builder
    query: secureQuery,

    // Batch operations
    batch: secureWriteBatch,

    // Note: alertLevel sarà disponibile quando useFirestoreMonitoring sarà implementato
  };
}
